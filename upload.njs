//const file: File = "upload.njs";
const file = "upload.njs";

// File to Base64 string
//const fileToBase64 = (file: File): Promise<string> => {
const fileToBase64 = (file) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (r) => {
      const base64str = (r.target?.result).replace(/data:.*\/.*;base64,/, '');
      resolve(base64str);
    };
    reader.onerror = (e) => reject(e);
  });
};
const content = await fileToBase64(file);

const data = JSON.stringify({
  branch: 'develop',
  message: 'upload image',
  content: `${content}`
});

const token = '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';
const owner = 'ultimate-language';  // ex: amay077
const repo = 'tools'; // ex: blog-poster

const url = `https://api.github.com/repos/${owner}/${repo}/contents/awesome_images/something.png`;

const p = {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': file.type
  },
  body: data
};

const res = await fetch(url, p);
if (res.ok) {
  const resJson = await res.json();
  console.log(`Upload succeeded.`, resJson.content.download_url);
} else {
  console.log(`Upload failed.`, res.status);
}