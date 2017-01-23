export default function hoursAgo(hours) {
  const now = new Date();
  return new Date(now.getTime() - (1000 * 60 * 60 * hours));
}
