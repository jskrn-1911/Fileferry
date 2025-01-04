
import BottomMenu from "@/components/BottomMenu";
import PricingComponent from "@/components/PricingComponent";
import { useEffect } from "react";

export default function Pricing() {
   useEffect(() => {
          document.body.style.overflow = "auto";
      }, []);

  return (
    <>
    
    <PricingComponent/>
    <BottomMenu/>
    </>
   
  )
}