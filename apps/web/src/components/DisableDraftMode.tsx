export default function DisableDraftMode() {
  return (
    <a
      className="mix-blend-difference bg-white/10 text-white border border-white/20 fixed bottom-4 right-4 px-3 py-1 rounded-full text-xs backdrop-blur duration-500"
      href="/api/disable-draft"
    >
      Disable Draft Mode
    </a>
  );
}
