import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Apply theme
am4core.useTheme(am4themes_animated);

const Tokenomics = () => {
  const chartRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
  });

  // Resize handler
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
    });
  }, []);

  useLayoutEffect(() => {
    // Add resize listener with debounce
    let resizeTimer;
    const resizeListener = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      clearTimeout(resizeTimer);
    };
  }, [handleResize]);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    // Create chart instance
    const chart = am4core.create(chartRef.current, am4charts.PieChart3D);

    // Dark background
    chart.background.fill = am4core.color("#1a1a1a");
    chart.background.opacity = 1;

    // Responsive padding - keep desktop as original (10), adjust only mobile
    const isMobile = windowSize.width < 768;
    const padding = isMobile ? 5 : 10; // Original was 10 for all
    chart.padding(padding, padding, padding, padding);

    // Sample data - customize as needed
    chart.data = [
      { category: "Presale", value: 40 },
      { category: "Liquidity", value: 25 },
      { category: "Team", value: 15 },
      { category: "Marketing", value: 10 },
      { category: "Development", value: 10 },
    ];

    // Create 3D series
    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    // Chart appearance - keep desktop exactly as original, adjust only mobile
    if (isMobile) {
      // Mobile-specific adjustments
      if (windowSize.width < 375) {
        // Very small phones (320px - 374px)
        series.depth = 15;
        chart.angle = 20;
        series.labels.template.fontSize = 6.5;
        series.labels.template.maxWidth = 100;
        series.labels.template.truncate = false;
        series.labels.template.wrap = true;
        series.labels.template.textAlign = "middle";
        series.ticks.template.length = 10;
        series.radius = am4core.percent(35); // Reduced from 45 to 35
        series.innerRadius = am4core.percent(0);
      } else if (windowSize.width < 400) {
        // Small phones under 400px (375px - 399px)
        series.depth = 16;
        chart.angle = 21;
        series.labels.template.fontSize = 8;
        series.labels.template.maxWidth = 95;
        series.labels.template.truncate = false;
        series.labels.template.wrap = true;
        series.labels.template.textAlign = "middle";
        series.radius = am4core.percent(38); // Reduced size for under 400px
        series.innerRadius = am4core.percent(0);
      } else if (windowSize.width < 425) {
        // Small phones (400px - 424px)
        series.depth = 18;
        chart.angle = 22;
        series.labels.template.fontSize = 10;
        series.labels.template.maxWidth = 70;
        series.radius = am4core.percent(50);
      } else {
        // Larger phones (425px - 767px)
        series.depth = 22;
        chart.angle = 25;
        series.labels.template.fontSize = 11;
        series.labels.template.maxWidth = 90;
        series.radius = am4core.percent(55);
      }

      // Additional mobile adjustments for very small screens
      if (windowSize.width < 400) {
        series.labels.template.dy = -5;
        series.ticks.template.length = 12; // Shorter ticks for smaller chart
      }
    } else {
      // Desktop - keep EXACTLY as original
      series.depth = 30;
      chart.angle = 30;
      series.labels.template.fontSize = 12;
      series.labels.template.maxWidth = 120;
      // No radius setting for desktop (keep default)
    }

    // Make all text white - these stay the same for all sizes
    series.labels.template.fill = am4core.color("#fff");
    series.labels.template.wrap = true;

    // Slightly reduced tick opacity - same for all sizes
    series.ticks.template.stroke = am4core.color("#fff");
    series.ticks.template.strokeOpacity = 0.8;
    series.ticks.template.strokeWidth = 1;

    // Tooltip color - same for all sizes
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color("#333");
    series.tooltip.label.fill = am4core.color("#fff");

    // Hide amCharts logo - same for all sizes
    chart.logo.disabled = true;

    // Handle chart responsiveness on window resize
    series.events.on("datavalidated", () => {
      const currentIsMobile = window.innerWidth < 768;
      if (currentIsMobile) {
        const currentWidth = window.innerWidth;
        if (currentWidth < 375) {
          series.depth = 15;
          chart.angle = 20;
          series.labels.template.fontSize = 6.5;
          series.labels.template.maxWidth = 100;
          series.labels.template.truncate = false;
          series.labels.template.wrap = true;
          series.labels.template.textAlign = "middle";
          series.ticks.template.length = 10;
          series.radius = am4core.percent(35); // Reduced from 45 to 35
          series.innerRadius = am4core.percent(0);
        } else if (currentWidth < 400) {
          series.depth = 16;
          chart.angle = 21;
          series.labels.template.fontSize = 8;
          series.labels.template.maxWidth = 95;
          series.labels.template.truncate = false;
          series.labels.template.wrap = true;
          series.labels.template.textAlign = "middle";
          series.radius = am4core.percent(38); // Reduced size for under 400px
          series.innerRadius = am4core.percent(0);
        } else if (currentWidth < 425) {
          series.depth = 18;
          chart.angle = 22;
          series.labels.template.fontSize = 10;
          series.labels.template.maxWidth = 70;
          series.radius = am4core.percent(50);
        } else {
          series.depth = 22;
          chart.angle = 25;
          series.labels.template.fontSize = 11;
          series.labels.template.maxWidth = 90;
          series.radius = am4core.percent(55);
        }
      } else {
        // Reset to original desktop values
        series.depth = 30;
        chart.angle = 30;
        series.labels.template.fontSize = 12;
        series.labels.template.maxWidth = 120;
        series.radius = undefined; // Remove radius setting for desktop
      }
    });

    // Cleanup on unmount
    return () => {
      chart.dispose();
    };
  }, [windowSize]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: windowSize.width < 768 ? "250px" : "250px", // Keep original 250px for all
        backgroundColor: "transparent",
      }}
    />
  );
};

export default Tokenomics;
