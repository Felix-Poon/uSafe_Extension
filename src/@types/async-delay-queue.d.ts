type Queue = {
  delay: <T>(
    fn: () => Promise<T>,
    delay?: number,
    timer?: number,
    add?: "unshift" | "push"
  ) => Promise<T>;
};

declare const queue: Queue;

declare module "async-delay-queue" {
  export default queue;
}
