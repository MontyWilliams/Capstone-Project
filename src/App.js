import "./styles/gradient.css";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import { useEffect } from "react";



export default function Home() {
  // useEffect(() => {
  //   const interBubble = document.querySelector('.interactive');
  //   if (!interBubble) return;

  //   let curX = 0;
  //   let curY = 0;
  //   let tgX = 0;
  //   let tgY = 0;

  //   function move() {
  //     curX += (tgX - curX) / 20;
  //     curY += (tgY - curY) / 20;
  //     interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
  //   }

  //   function handleMouseMove(event) {
  //     tgX = event.clientX;
  //     tgY = event.clientY;
  //     move(); // Trigger move only when mouse moves
  //   }

  //   // Add event listener for mouse movement
  //   window.addEventListener('mousemove', handleMouseMove);

  //   // Cleanup function to remove event listener
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  return (
    <div>
      <Layout />
    </div>
    
  );
}
