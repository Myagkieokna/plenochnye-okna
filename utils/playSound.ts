// src/utils/playSound.ts

/**
 * Воспроизводит звук.
 * @param {string} sound - Путь к аудиофайлу.
 */
export function playSound(sound: string): void {
  const audio = new Audio(sound);
  audio.play();
}
