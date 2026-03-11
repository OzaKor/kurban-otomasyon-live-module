export default function logger(...args: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    console.log("-- Logger Start --");
    console.log(...args);
    console.log("-- Logger End --");
  }
}
