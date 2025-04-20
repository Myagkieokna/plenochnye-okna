// // server/api/images.ts
// // API-роут для получения списка изображений
// // import path from 'path';
// // import { fileURLToPath } from 'url';
// import { defineEventHandler, sendError, createError, H3Error } from 'h3';
// import path from 'path';
// import { promises as fs } from 'fs';

// // const __filename = fileURLToPath(import.meta.url); // Получаем имя файла
// // const __dirname = path.dirname(__filename);       // Получаем директорию

// export default defineEventHandler(async (event) => {
//   try {
//     const imagesDir = path.resolve(process.cwd(), 'public/img/gallery');
//     console.log("imagesDir", imagesDir);

//     // Проверяем, существует ли директория
//     const stat = await fs.stat(imagesDir);
//     if (!stat.isDirectory()) {
//       throw createError({
//         statusCode: 500,
//         statusMessage: 'Images directory is not a valid directory'
//       });
//     }

//     const files = await fs.readdir(imagesDir);
//     console.log("files", files);

//     // Фильтруем только изображения
//     const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
//     console.log("imageFiles", imageFiles);

//     if (imageFiles.length === 0) {
//       console.log('No images to return.');
//       return { error: 'No images found' }; // Возвращаем ошибку, если изображений нет
//     }

//     return imageFiles.map((image) => ({
//       src: `/img/gallery/${image}`,
//       watermark: 'Ваш водяной знак'
//     }));
//   } catch (err) {
//     // Приведение типа "unknown" к Error
//     const error = err instanceof Error ? err : new Error('Unknown error occurred');

//     // Логируем ошибку для отладки
//     console.error("Error in images API:", error);

//     // Отправляем ошибку клиенту
//     return sendError(
//       event, 
//       createError({
//         statusCode: error instanceof H3Error ? error.statusCode || 500 : 500,
//         statusMessage: error.message || 'Internal Server Error',
//         data: 'An error occurred while processing your request'
//       })
//     );
//   }
// });
