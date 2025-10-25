<template>
  <div class="configurator">
    <h1>Конфигуратор мягких окон</h1>

    <div class="controls">
      <label>
        Форма:
        <select v-model="selectedShape">
          <option value="rectangle">Прямоугольник</option>
          <option value="trapezoid">Трапеция</option>
          <option value="p-shape">П-образная</option>
        </select>
      </label>

      <label>
        Ширина (м):
        <input v-model.number="width" type="number" min="0.1" step="0.1" />
      </label>

      <label>
        Высота (м):
        <input v-model.number="height" type="number" min="0.1" step="0.1" />
      </label>

      <label v-if="selectedShape === 'trapezoid'">
        Верхняя ширина (м):
        <input v-model.number="topWidth" type="number" min="0.1" step="0.1" />
      </label>

      <label>
        Цена за 1 м² (₽):
        <input v-model.number="pricePerSquareMeter" type="number" min="1" step="1" />
      </label>
    </div>

    <div class="preview">
      <svg :width="svgWidth + 150" :height="svgHeight + 150" class="preview-svg">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
          </marker>
        </defs>

        <g transform="translate(75, 75)">
          <!-- Форма -->
          <template v-if="selectedShape === 'rectangle'">
            <!-- Стены -->
            <rect 
              x="0" 
              y="0" 
              :width="svgWidth" 
              :height="svgHeight" 
              fill="#89CFF0" 
              stroke="#000" 
              stroke-width="8"
            />

            <!-- Размеры сторон -->
            <!-- Верхняя линия -->
            <line 
              x1="0" y1="-20" 
              :x2="svgWidth" y2="-20" 
              stroke="#000" stroke-width="1" 
              marker-start="url(#arrow)" 
              marker-end="url(#arrow)"
            />
            <text :x="svgWidth / 2" y="-30" text-anchor="middle">{{ width }} м</text>

            <!-- Правая линия -->
            <line 
              :x1="svgWidth + 20" y1="0" 
              :x2="svgWidth + 20" :y2="svgHeight" 
              stroke="#000" stroke-width="1" 
              marker-start="url(#arrow)" 
              marker-end="url(#arrow)"
            />
            <text :x="svgWidth + 30" :y="svgHeight / 2" text-anchor="middle" transform="rotate(90, svgWidth + 30, svgHeight / 2)">
              {{ height }} м
            </text>
          </template>

          <template v-else-if="selectedShape === 'trapezoid'">
            <polygon 
              :points="trapezoidPoints"
              fill="#90EE90"
              stroke="#000" 
              stroke-width="8"
            />

            <!-- Верхняя линия -->
            <line 
              :x1="trapezoidTopStart" y1="-20" 
              :x2="trapezoidTopEnd" y2="-20" 
              stroke="#000" stroke-width="1" 
              marker-start="url(#arrow)" 
              marker-end="url(#arrow)"
            />
            <text :x="svgWidth / 2" y="-30" text-anchor="middle">{{ topWidth }} м</text>

            <!-- Нижняя линия -->
            <line 
              x1="0" :y1="svgHeight + 20" 
              :x2="svgWidth" :y2="svgHeight + 20" 
              stroke="#000" stroke-width="1" 
              marker-start="url(#arrow)" 
              marker-end="url(#arrow)"
            />
            <text :x="svgWidth / 2" :y="svgHeight + 40" text-anchor="middle">{{ width }} м</text>

            <!-- Левая линия -->
            <line 
              x1="-20" y1="0" 
              x2="-20" :y2="svgHeight" 
              stroke="#000" stroke-width="1" 
              marker-start="url(#arrow)" 
              marker-end="url(#arrow)"
            />
            <text x="-30" :y="svgHeight / 2" text-anchor="middle" transform="rotate(-90, -30, svgHeight / 2)">
              {{ height }} м
            </text>
          </template>

          <template v-else-if="selectedShape === 'p-shape'">
            <path 
              :d="pShapePath" 
              fill="#FFCCCB"
              stroke="#000" 
              stroke-width="8"
            />

            <!-- Верхняя линия -->
            <line 
              x1="0" y1="-20" 
              :x2="svgWidth" y2="-20" 
              stroke="#000" stroke-width="1"
              marker-start="url(#arrow)" 
              marker-end="url(#arrow)"
            />
            <text :x="svgWidth / 2" y="-30" text-anchor="middle">{{ width }} м</text>

            <!-- Правая линия -->
            <line 
              :x1="svgWidth + 20" y1="0" 
              :x2="svgWidth + 20" :y2="svgHeight" 
              stroke="#000" stroke-width="1"
              marker-start="url(#arrow)" 
              marker-end="url(#arrow)"
            />
            <text :x="svgWidth + 30" :y="svgHeight / 2" text-anchor="middle" transform="rotate(90, svgWidth + 30, svgHeight / 2)">
              {{ height }} м
            </text>
          </template>
        </g>
      </svg>
    </div>

    <div class="results">
      <p>Площадь: <strong>{{ area.toFixed(2) }}</strong> м²</p>
      <p>Цена: <strong>{{ totalPrice.toLocaleString() }}</strong> ₽</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedShape = ref<'rectangle' | 'trapezoid' | 'p-shape'>('rectangle')

const width = ref(2)
const height = ref(2)
const topWidth = ref(1.5) // только для трапеции
const pricePerSquareMeter = ref(500)

const scale = 100
const svgWidth = computed(() => width.value * scale)
const svgHeight = computed(() => height.value * scale)

const area = computed(() => {
  if (selectedShape.value === 'rectangle') {
    return width.value * height.value
  }
  if (selectedShape.value === 'trapezoid') {
    return ((width.value + topWidth.value) / 2) * height.value
  }
  if (selectedShape.value === 'p-shape') {
    const wallThickness = 0.5
    const outerArea = width.value * height.value
    const innerArea = (width.value - 2 * wallThickness) * (height.value - wallThickness)
    return outerArea - innerArea
  }
  return 0
})

const totalPrice = computed(() => area.value * pricePerSquareMeter.value)

const trapezoidPoints = computed(() => {
  const top = topWidth.value * scale
  const bottom = width.value * scale
  const h = svgHeight.value
  const xOffset = (bottom - top) / 2

  return `
    ${xOffset},0 
    ${xOffset + top},0 
    ${bottom},${h} 
    0,${h}
  `
})

// Для линий размеров трапеции
const trapezoidTopStart = computed(() => {
  const top = topWidth.value * scale
  const bottom = width.value * scale
  return (bottom - top) / 2
})
const trapezoidTopEnd = computed(() => {
  return trapezoidTopStart.value + topWidth.value * scale
})

const pShapePath = computed(() => {
  const outerW = width.value * scale
  const outerH = height.value * scale
  const thickness = 50 // фиксированная толщина "стен" П-образной

  return `
    M0,0 
    H${outerW} 
    V${outerH} 
    H${outerW - thickness}
    V${thickness}
    H${thickness}
    V${outerH}
    H0
    Z
  `
})
</script>

<style scoped>
.configurator {
  max-width: 750px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 1px dashed #999;
  padding: 10px;
}
.preview-svg {
  background: #fff;
}
.results {
  font-size: 18px;
}
text {
  font-size: 14px;
  fill: #333;
  font-weight: bold;
}
</style>
