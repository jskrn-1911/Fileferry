import React, { useEffect, useRef, useState } from "react";

const Ads: React.FC = () => {
    const adRef = useRef<HTMLDivElement | null>(null);
    const [adLoaded, setAdLoaded] = useState(false); // Track if the ad is loaded

    useEffect(() => {
        const checkAndLoadAds = () => {
            if (adRef.current && !adLoaded) {
                const { offsetWidth, offsetHeight } = adRef.current;
                // console.log("Ad container dimensions:", offsetWidth, offsetHeight);

                if (offsetWidth > 0 && offsetHeight > 0) {
                    try {
                        // Explicitly define the type for window.adsbygoogle
                        (window as unknown as { adsbygoogle: Array<unknown> }).adsbygoogle.push({});
                        setAdLoaded(true); // Mark as loaded
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error("AdSense error:", error.message);
                        } else {
                            console.error("Unknown error occurred while loading AdSense");
                        }
                    }
                }
            }
        };

        // Observe size changes
        const resizeObserver = new ResizeObserver(() => {
            setAdLoaded(false); // Reset adLoaded on resize
            checkAndLoadAds();
        });

        if (adRef.current) {
            resizeObserver.observe(adRef.current);
        }

        // Initial check
        checkAndLoadAds();

        return () => {
            resizeObserver.disconnect();
        };
    }, [adLoaded]); // Re-run only when `adLoaded` state changes

    return (
        <div className="h-full w-full flex justify-center items-center p-0 sm:p-8">
            <div
                ref={adRef}
                className="h-[450px] w-full border-2 flex justify-center items-center border-dashed border-slate-100"
                style={{ minWidth: "300px", minHeight: "250px" }}
            >
                <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-8204802433512401"
                    data-ad-slot="5389354248"
                    // data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            </div>
        </div>
    );
};

export default Ads;
