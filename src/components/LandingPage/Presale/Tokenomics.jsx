import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Apply theme
am4core.useTheme(am4themes_animated);

const Tokenomics = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // Create chart instance
    const chart = am4core.create(chartRef.current, am4charts.PieChart3D);

    // Dark background
    chart.background.fill = am4core.color("#1a1a1a");
    chart.background.opacity = 1;

    // Responsive padding
    chart.padding(10, 10, 10, 10);

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

    // Chart appearance - responsive depth and angle
    const isMobile = window.innerWidth < 640;
    series.depth = isMobile ? 20 : 30;
    chart.angle = isMobile ? 25 : 30;

    // Make all text white with responsive font size
    series.labels.template.fill = am4core.color("#fff");
    series.labels.template.fontSize = isMobile ? 10 : 12;
    series.labels.template.wrap = true;
    series.labels.template.maxWidth = isMobile ? 80 : 120;

    // Slightly reduced tick opacity
    series.ticks.template.stroke = am4core.color("#fff");
    series.ticks.template.strokeOpacity = 0.8;
    series.ticks.template.strokeWidth = 1;

    // Tooltip color
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color("#333");
    series.tooltip.label.fill = am4core.color("#fff");

    // Hide amCharts logo
    chart.logo.disabled = true;

    // Cleanup on unmount
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "250px",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default Tokenomics;
