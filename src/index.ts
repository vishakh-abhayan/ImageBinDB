import { DBSchema, openDB } from "idb";

interface MyDB extends DBSchema {
  images: {
    key: string;
    value: ArrayBuffer;
  };
}

/**
 * Converts an image file to binary data.
 *
 * @param {File} image - The image file to be converted.
 * @return {Promise<ArrayBuffer>} A promise that resolves with the binary data of the image.
 */

export async function imageToBinary(image: File): Promise<ArrayBuffer> {
  if (!(image instanceof File)) {
    throw new Error("Invalid input: Expected a File object.");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error("Failed to read the image file."));
    reader.readAsArrayBuffer(image);
  });
}

/**
 * Stores an image in the specified database.
 *
 * @param {string} dbName - The name of the database.
 * @param {string} key - The key associated with the image.
 * @param {ArrayBuffer} data - The image data to be stored.
 * @return {Promise<void>} A promise that resolves when the image is successfully stored.
 * @throws {Error} Thrown if any of the required parameters (dbName, key, or data) are undefined.
 *                  Thrown if there is an error while storing the image in the database.
 */

export async function storeImage(
  dbName: string,
  key: string,
  data: ArrayBuffer
): Promise<void> {
  if (!dbName || !key || !data) {
    throw new Error(
      "Missing required parameters: dbName, key, or data is undefined."
    );
  }

  try {
    const db = await openDB<MyDB>(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("images")) {
          db.createObjectStore("images");
        }
      },
    });

    const tx = db.transaction("images", "readwrite");
    await tx.store.put(data, key);
    await tx.done;
    db.close();
  } catch (error) {
    throw new Error(`Failed to store image in database: ${error}`);
  }
}

/**
 * Retrieves an image from the specified database.
 *
 * @param {string} dbName - The name of the database.
 * @param {string} key - The key of the image to retrieve.
 * @returns {Promise<ArrayBuffer | undefined>} - The retrieved image as an ArrayBuffer, or undefined if not found.
 */

export async function retrieveImage(
  dbName: string,
  key: string
): Promise<ArrayBuffer | undefined> {
  if (!dbName || !key) {
    throw new Error("Missing required parameters: dbName or key is undefined.");
  }

  try {
    const db = await openDB<MyDB>(dbName, 1);
    const tx = db.transaction("images", "readonly");
    const data = await tx.store.get(key);
    db.close();
    return data;
  } catch (error) {
    throw new Error(`Failed to retrieve image from database: ${error}`);
  }
}

/**
 * Converts binary data to an image URL.
 *
 * @param {ArrayBuffer} binaryData - The binary data to be converted.
 * @throws {Error} Invalid input: Expected an ArrayBuffer.
 * @throws {Error} Failed to convert binary data to an image URL: {error}
 * @return {string} The converted image URL.
 */

export function binaryToImageURL(binaryData: ArrayBuffer): string {
  if (!(binaryData instanceof ArrayBuffer)) {
    throw new Error("Invalid input: Expected an ArrayBuffer.");
  }

  try {
    const blob = new Blob([binaryData]);
    return URL.createObjectURL(blob);
  } catch (error) {
    throw new Error(`Failed to convert binary data to an image URL: ${error}`);
  }
}
