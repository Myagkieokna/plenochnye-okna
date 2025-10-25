<template>
  <img
    :src="src"
    :alt="alt"
    @click="openFullscreen"
    class="cursor-zoom-in"
  />
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

defineProps<{
  src: string
  alt?: string
}>()

const overlay = ref<HTMLDivElement | null>(null)

const openFullscreen = (event: MouseEvent) => {
  const target = event.target as HTMLImageElement
  if (!target) return

  const rect = target.getBoundingClientRect()
  const originalBorderRadius = getComputedStyle(target).borderRadius || '0px'

  // делаем оригинал полупрозрачным
  target.style.transition = 'opacity 0.3s ease'
  target.style.opacity = '0.2'

  // overlay
  const overlayEl = document.createElement('div')
  overlayEl.style.position = 'fixed'
  overlayEl.style.top = '0'
  overlayEl.style.left = '0'
  overlayEl.style.width = '100vw'
  overlayEl.style.height = '100vh'
  overlayEl.style.background = 'rgba(0,0,0,0)'
  overlayEl.style.display = 'flex'
  overlayEl.style.justifyContent = 'center'
  overlayEl.style.alignItems = 'center'
  overlayEl.style.cursor = 'zoom-out'
  overlayEl.style.zIndex = '99999'
  overlayEl.style.transition = 'background 0.3s ease'

  // clone image
  const img = document.createElement('img')
  img.src = target.src
  img.style.position = 'absolute'
  img.style.top = `${rect.top}px`
  img.style.left = `${rect.left}px`
  img.style.width = `${rect.width}px`
  img.style.height = `${rect.height}px`
  img.style.objectFit = 'contain'
  img.style.borderRadius = originalBorderRadius
  img.style.transition = 'all 0.4s ease, opacity 0.4s ease'

  overlayEl.appendChild(img)
  document.body.appendChild(overlayEl)

  // размеры с сохранением пропорций
  const naturalRatio = target.naturalWidth / target.naturalHeight
  const maxWidth = window.innerWidth * 0.7
  const maxHeight = window.innerHeight * 0.7

  let targetWidth = maxWidth
  let targetHeight = targetWidth / naturalRatio

  if (targetHeight > maxHeight) {
    targetHeight = maxHeight
    targetWidth = targetHeight * naturalRatio
  }

  const targetTop = (window.innerHeight - targetHeight) / 2
  const targetLeft = (window.innerWidth - targetWidth) / 2

  // анимация открытия
  requestAnimationFrame(() => {
    overlayEl.style.background = 'rgba(0,0,0,0.5)'
    img.style.width = `${targetWidth}px`
    img.style.height = `${targetHeight}px`
    img.style.top = `${targetTop}px`
    img.style.left = `${targetLeft}px`
  })

  // закрытие
  overlayEl.addEventListener('click', () => {
    overlayEl.style.background = 'rgba(0,0,0,0)'

    // летим обратно к оригиналу
    img.style.width = `${rect.width}px`
    img.style.height = `${rect.height}px`
    img.style.top = `${rect.top}px`
    img.style.left = `${rect.left}px`
    img.style.opacity = '0'

    // плавно возвращаем opacity оригиналу
    target.style.transition = 'opacity 0.6s ease'
    setTimeout(() => {
      target.style.opacity = '1'
    }, 50) // маленькая задержка для плавности

    setTimeout(() => {
      if (overlayEl.parentNode) {
        overlayEl.parentNode.removeChild(overlayEl)
      }
    }, 400)
  })

  overlay.value = overlayEl
}

onUnmounted(() => {
  if (overlay.value && overlay.value.parentNode) {
    overlay.value.parentNode.removeChild(overlay.value)
  }
})
</script>

<style scoped>
.cursor-zoom-in {
  cursor: zoom-in;
  transition: opacity 0.3s ease;
}
</style>
