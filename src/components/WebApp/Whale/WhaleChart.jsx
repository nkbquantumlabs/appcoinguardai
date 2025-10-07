import React, { useState } from "react";
import { motion } from "framer-motion";

const colors = [
  '#FFC971',
  '#FF6F91',
  '#9DFF8C',
  '#66E0FF',
  '#5BA0FF',
  '#9A7DFF',
  '#FF9DFF',
  '#F0F0F0',
  '#f4a12dff',
];

const otherColor = '#87CEEB';

const formatValue = (value) => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

const WhaleChart = ({
  walletData,
  address,
  size = 200,
  strokeWidth = 20,
  spacing = 8,
  showLabels = false,
  labelColor = '#f3f4f6',
  labelSize = 10,
  showCenterText = true,
  centerText,
  subText = 'Total Value',
}) => {
  const [selectedSegment, setSelectedSegment] = useState(null);

  const holdingsData = walletData?.holdings || walletData?.tokenHoldings || [];
  const processedHoldings = holdingsData
    .map((holding) => ({
      ...holding,
      numericValue: holding.value || parseFloat(holding.balance || '0'),
    }))
    .filter((holding) => holding.numericValue > 0);

  const sortedHoldings = [...processedHoldings].sort((a, b) => b.numericValue - a.numericValue);

  let chartData = [];
  if (sortedHoldings.length > 0) {
    let top = [];
    let otherSum = 0;

    if (sortedHoldings.length > 10) {
      top = sortedHoldings.slice(0, 9);
      const other = sortedHoldings.slice(9);
      otherSum = other.reduce((sum, t) => sum + t.numericValue, 0);
    } else {
      top = sortedHoldings;
    }

    chartData = top.map((t, i) => ({
      label: t.name || t.symbol || 'Unknown',
      value: t.numericValue,
      color: colors[i % colors.length],
      symbol: t.symbol || '—',
    }));

    if (sortedHoldings.length > 10 && otherSum > 0) {
      chartData.push({
        label: 'Other',
        value: otherSum,
        color: otherColor,
        symbol: 'OTHER',
      });
    }
  }

  const isEmpty = chartData.length === 0;

  const formatCenterText = () => {
    if (selectedSegment) {
      return formatValue(selectedSegment.value);
    }
    if (isEmpty) return '$0.00';
    return formatValue(chartData.reduce((sum, item) => sum + item.value, 0));
  };

  const formatSubText = () => {
    if (selectedSegment) {
      const text = selectedSegment.symbol || selectedSegment.label;
      return text.length > 10 ? `${text.substring(0, 10)}...` : text;
    }
    return isEmpty ? 'No Holdings' : subText;
  };

  const resolvedCenterText = centerText || formatCenterText();
  const resolvedSubText = formatSubText();

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  let accumulatedAngle = 0;

  const isSingle = chartData.length === 1;

  const segments = chartData.map((item, index) => {
    const percentage = item.value / total;
    let angle = percentage * 360;

    // For single token, make it a full circle
    if (isSingle) {
      angle = 360;
    }

    const gap = isSingle ? 0 : spacing;
    const startAngle = accumulatedAngle + gap / 2;
    const endAngle = accumulatedAngle + angle - gap / 2;
    accumulatedAngle += angle;

    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;

    const startX = center + radius * Math.cos(startRadians);
    const startY = center + radius * Math.sin(startRadians);
    const endX = center + radius * Math.cos(endRadians);
    const endY = center + radius * Math.sin(endRadians);

    // For full circle (single token), use a different approach
    let pathData;
    if (isSingle) {
      // Create a full circle using two semicircle arcs
      const topX = center;
      const topY = center - radius;
      const bottomX = center;
      const bottomY = center + radius;
      
      pathData = [
        `M ${topX} ${topY}`,
        `A ${radius} ${radius} 0 0 1 ${bottomX} ${bottomY}`,
        `A ${radius} ${radius} 0 0 1 ${topX} ${topY}`,
      ].join(' ');
    } else {
      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
      pathData = [
        `M ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      ].join(' ');
    }

    const midAngle = (startAngle + endAngle) / 2;

    return {
      pathData,
      color: item.color,
      angle,
      data: item,
      midAngle,
      startAngle,
      endAngle,
    };
  });

  const handleMouseMove = (event) => {
    if (isEmpty || isSingle) return; // Disable hover for empty or single token
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - center - 20;
    const y = event.clientY - rect.top - center - 20;
    const distance = Math.sqrt(x * x + y * y);

    // Check if mouse is within the ring area
    if (distance > radius + strokeWidth / 2 || distance < radius - strokeWidth / 2) {
      setSelectedSegment(null);
      return;
    }

    // Calculate angle from center
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    // Find the segment that contains this angle
    let foundSegment = null;
    for (const segment of segments) {
      let startAngle = segment.startAngle;
      let endAngle = segment.endAngle;
      
      // Handle segments that cross the 0/360 boundary
      if (endAngle > 360) {
        endAngle = endAngle - 360;
        if (angle >= startAngle || angle <= endAngle) {
          foundSegment = segment.data;
          break;
        }
      } else if (startAngle < 0) {
        startAngle = startAngle + 360;
        if (angle >= startAngle || angle <= endAngle) {
          foundSegment = segment.data;
          break;
        }
      } else {
        // Normal case - segment doesn't cross boundary
        if (angle >= startAngle && angle <= endAngle) {
          foundSegment = segment.data;
          break;
        }
      }
    }

    setSelectedSegment(foundSegment);
  };

  const handleClick = (event) => {
    if (isEmpty || isSingle) return; // Disable click for empty or single token
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - center - 20;
    const y = event.clientY - rect.top - center - 20;
    const distance = Math.sqrt(x * x + y * y);

    // Check if click is within the ring area
    if (distance > radius + strokeWidth / 2 || distance < radius - strokeWidth / 2) {
      setSelectedSegment(null);
      return;
    }

    // Calculate angle from center
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    // Find the segment that contains this angle
    let foundSegment = null;
    for (const segment of segments) {
      let startAngle = segment.startAngle;
      let endAngle = segment.endAngle;
      
      // Handle segments that cross the 0/360 boundary
      if (endAngle > 360) {
        endAngle = endAngle - 360;
        if (angle >= startAngle || angle <= endAngle) {
          foundSegment = segment.data;
          break;
        }
      } else if (startAngle < 0) {
        startAngle = startAngle + 360;
        if (angle >= startAngle || angle <= endAngle) {
          foundSegment = segment.data;
          break;
        }
      } else {
        // Normal case - segment doesn't cross boundary
        if (angle >= startAngle && angle <= endAngle) {
          foundSegment = segment.data;
          break;
        }
      }
    }

    setSelectedSegment(foundSegment);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <svg
        width={size + 40}
        height={size + 40}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => !isSingle && setSelectedSegment(null)}
        onClick={handleClick}
        style={{ cursor: isSingle || isEmpty ? "default" : "pointer" }}
      >
        <g transform={`translate(20,20)`}>
          {/* Show background circle only when there are segments */}
          {!isEmpty && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#212121"
              strokeWidth={strokeWidth}
              fill="none"
            />
          )}
          {/* Show empty state circle when no data */}
          {isEmpty && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#333333"
              strokeWidth={strokeWidth}
              fill="none"
              opacity="0.3"
            />
          )}
          {segments.map((s, i) => {
            const isSelected = selectedSegment && selectedSegment.label === s.data.label && selectedSegment.value === s.data.value;
            const offset = isSelected ? 6 : 0;
            const dx = offset * Math.cos((s.midAngle * Math.PI) / 180);
            const dy = offset * Math.sin((s.midAngle * Math.PI) / 180);

            return (
              <motion.path
                key={`${s.data.label}-${i}`}
                d={s.pathData}
                stroke={s.color}
                strokeWidth={strokeWidth}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, translateX: dx, translateY: dy }}
                transition={{ pathLength: { duration: 0.8 }, translateX: { duration: 0.1 }, translateY: { duration: 0.1 } }}
              />
            );
          })}
          <circle
            cx={center}
            cy={center}
            r={radius - strokeWidth / 2}
            fill="#141416"
          />
          {showCenterText && (
            <>
              <text
                x={center}
                y={center - 2}
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#f3f4f6"
              >
                {resolvedCenterText}
              </text>
              <text
                x={center}
                y={center + 18}
                textAnchor="middle"
                fontSize="11"
                fill="#9ca3af"
              >
                {resolvedSubText}
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default WhaleChart;