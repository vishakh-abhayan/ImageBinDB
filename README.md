# ImageBinDB 💫

## Introduction

`ImageBinDB` is a NPM module designed for converting images to binary data, storing them in IndexedDB, and retrieving and converting them back to images. It's an ideal solution for web applications that require efficient image handling and storage using browser technologies.

## Features

- Convert images to binary data.
- Store and retrieve binary data in/from IndexedDB.
- Convert binary data back to images.

## Installation

```bash
npm install imagebindb
```

### Importing the Module

```javascript
import {imageToBinary,storeImage,retrieveImage,binaryToImageURL} from "imagebindb";
```

### Converting an Image to Binary

```javascript
const imageFile = document.getElementById("input").files[0];
imageToBinary(imageFile).then((binaryData) => {
  // Handle the binary data
});
```

### Storing Binary Data in IndexedDB

```javascript
storeImage("myDatabase", "myImageKey", binaryData).then(() =>
  console.log("Image stored successfully")
);
```

### Retrieving Binary Data from IndexedDB

```javascript
retrieveImage("myDatabase", "myImageKey").then((binaryData) => {
  if (binaryData) {
    // Handle the retrieved binary data
  }
});
```

### Converting Binary Data Back to an Image URL

```javascript
const imageUrl = binaryToImageURL(binaryData);
// Use the image URL (e.g., as the src of an img element)
```

## API Reference

This section details the functions available in the `ImageBinDB` module, along with their descriptions and usage.

### `imageToBinary(image: File): Promise<ArrayBuffer>`

Converts an image file to binary data.

**Parameters:**
- `image`: `File` - The image file to convert.

**Returns:**
- `Promise<ArrayBuffer>` - A promise that resolves with the binary data.

---

### `storeImage(dbName: string, key: string, data: ArrayBuffer): Promise<void>`

Stores binary data in IndexedDB.

**Parameters:**
- `dbName`: `string` - The name of the IndexedDB database.
- `key`: `string` - The key under which to store the data.
- `data`: `ArrayBuffer` - The binary data to be stored.

**Returns:**
- `Promise<void>`

---

### `retrieveImage(dbName: string, key: string): Promise<ArrayBuffer | undefined>`

Retrieves binary data from IndexedDB.

**Parameters:**
- `dbName`: `string` - The name of the IndexedDB database.
- `key`: `string` - The key under which the data is stored.

**Returns:**
- `Promise<ArrayBuffer | undefined>` - A promise that resolves with the retrieved binary data or undefined if the key is not found.

---

### `binaryToImageURL(binaryData: ArrayBuffer): string`

Converts binary data to an image URL.

**Parameters:**
- `binaryData`: `ArrayBuffer` - The binary data to be converted.

**Returns:**
- `string` - The image URL created from the binary data.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
