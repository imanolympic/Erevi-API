export default function notFound() {
  return {
    statusCode: 404,
    body: { error: "Page not found." },
  };
}
