export async function blobToBase64(blobUrl) {
  const blob = await fetch(blobUrl).then((res) => res.blob());

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
