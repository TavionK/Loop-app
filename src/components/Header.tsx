import { SquareCheck, LogOut } from "lucide-react";
import { type RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

interface HeaderProps {
  completeTaskCount: number;
  onLogout: () => void;
}

export default function Header({ completeTaskCount, onLogout }: HeaderProps) {
  const heading: RefObject<null> = useRef(null);
  const icon: RefObject<null> = useRef(null);

  useEffect((): void => {
    const split = new SplitText(heading.current, { type: "chars" });
    const tl: gsap.core.Timeline = gsap.timeline();

    tl.from(split.chars, { opacity: 0, y: 10, stagger: 0.05, duration: 0.6 });
    tl.from(".lucide-square-check", {
      opacity: 0,
      y: -50,
      duration: 0.6,
      delay: 1,
      ease: "bounce.out(1.5)",
    });
  }, []);

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 ref={heading}>
          Simple{" "}
          <span ref={icon} className="inline">
            <SquareCheck
              aria-hidden="true"
              className="text-purple-600 inline size-7 -translate-y-1"
              strokeWidth={2.5}
            />
          </span>
          <br />
          TODO List
        </h1>

        <p aria-live="polite" className="text-gray-500 text-xs mt-2 uppercase">
          {completeTaskCount} tasks remaining
        </p>
      </div>
      <button
        onClick={onLogout}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-red-50 transition-colors duration-300 ease-in-out"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
