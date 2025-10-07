import React from "react";

const HoneyDetails = ({ data }) => {
  const sanitizeInput = (input) => {
    if (!input) return null;
    return String(input);
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return null;
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const renderBooleanValue = (value) => {
    if (value === "0") return "No";
    if (value === "1") return "Yes";
    return null;
  };

  const renderTokenDetails = () => {
    const additionalMetrics = [
      { label: "Holder Count:", value: sanitizeInput(data.holder_count) },
      { label: "Transfer Tax:", value: data.transfer_tax ? `${formatNumber(data.transfer_tax)}%` : null },
      { label: "LP Holder Count:", value: sanitizeInput(data.lp_holder_count) },
      { label: "LP Total Supply:", value: formatNumber(data.lp_total_supply) },
    ].filter((item) => item.value !== null);

    const tokenDetails = [
      { label: "Is Open Source:", value: renderBooleanValue(data.is_open_source) },
      { label: "Is in DEX:", value: renderBooleanValue(data.is_in_dex) },
      { label: "Is Proxy:", value: renderBooleanValue(data.is_proxy) },
      { label: "Is Anti-Whale:", value: renderBooleanValue(data.is_anti_whale) },
      { label: "Anti-Whale Modifiable:", value: renderBooleanValue(data.anti_whale_modifiable) },
      { label: "Can Take Back Ownership:", value: renderBooleanValue(data.can_take_back_ownership) },
      { label: "Cannot Buy:", value: renderBooleanValue(data.cannot_buy) },
      { label: "Cannot Sell All:", value: renderBooleanValue(data.cannot_sell_all) },
      { label: "External Call:", value: renderBooleanValue(data.external_call) },
      { label: "Hidden Owner:", value: renderBooleanValue(data.hidden_owner) },
      { label: "Is Blacklisted:", value: renderBooleanValue(data.is_blacklisted) },
      { label: "Is Mintable:", value: renderBooleanValue(data.is_mintable) },
      { label: "Is Whitelisted:", value: renderBooleanValue(data.is_whitelisted) },
      { label: "Personal Slippage Modifiable:", value: renderBooleanValue(data.personal_slippage_modifiable) },
      { label: "Selfdestruct:", value: renderBooleanValue(data.selfdestruct) },
      { label: "Slippage Modifiable:", value: renderBooleanValue(data.slippage_modifiable) },
      { label: "Trading Cooldown:", value: renderBooleanValue(data.trading_cooldown) },
      { label: "Transfer Pausable:", value: renderBooleanValue(data.transfer_pausable) },
      {
        label: "Launchpad Token:",
        value:
          data.launchpad_token?.is_launchpad_token === "1"
            ? `Yes (${sanitizeInput(data.launchpad_token?.launchpad_name)})`
            : data.launchpad_token?.is_launchpad_token === "0"
            ? "No"
            : null,
      },
      {
        label: "Honeypot with Same Creator:",
        value: sanitizeInput(data.honeypot_with_same_creator),
      },
    ].filter((item) => item.value !== null);

    if (additionalMetrics.length === 0 && tokenDetails.length === 0) return null;

    return (
      <div className="w-full max-w-6xl mx-auto px-1.5 py-4">
        <h3 className="text-lg sm:text-xl font-semibold text-[#CCFF00be] mb-4 border-b border-gray-700 pb-2 tracking-wider">
          TOKEN DETAILS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {additionalMetrics.map((item, index) => (
            <div
              key={`metric-${index}`}
              className="bg-[#141416] p-3 sm:p-4 rounded-lg border border-[#212121b8] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0"
            >
              <span className="text-gray-400 text-xs sm:text-sm font-medium">{item.label}</span>
              <span className="text-white font-semibold text-sm sm:text-base break-words">{item.value}</span>
            </div>
          ))}

          {tokenDetails.map((item, index) => (
            <div
              key={`detail-${index}`}
              className="bg-[#141416] p-3 sm:p-4 rounded-lg border border-[#212121b8] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0"
            >
              <span className="text-gray-400 text-xs sm:text-sm font-medium break-words">{item.label}</span>
              <span className="text-white font-semibold text-sm sm:text-base">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return renderTokenDetails();
};

export default HoneyDetails;
