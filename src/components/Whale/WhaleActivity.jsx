import React, { useMemo, useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FiArrowUpRight, FiArrowDownLeft, FiExternalLink } from "react-icons/fi";

const daysToPhrase = (days) => {
  switch (days) {
    case '1':
      return '24 hours';
    case '7':
      return '7 days';
    case '30':
      return '1 month';
    case '60':
      return '2 months';
    case '90':
      return '3 months';
    default:
      return 'selected interval';
  }
};

const shorten = (str, left = 6, right = 4) => {
  if (!str) return 'N/A';
  return str.length > left + right ? `${str.slice(0, left)}...${str.slice(-right)}` : str;
};

const WhaleActivity = ({ walletData, chain, days }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const raw = walletData?.recentActivity ?? [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = useMemo(() => {
    return raw.map((a) => {
      const typeText = chain !== 'Solana' ? (a.type ? a.type.toString().toUpperCase() : (a.amount > 0 ? 'IN' : 'OUT')) : undefined;
      const hash = String(a.tx_hash || '—');
      const blockText = String(a.block || '—');
      const fromText = String(a.from || '—');
      const toText = String(a.to || '—');
      const amountNum = a.amount !== null && a.amount !== undefined ? parseFloat(String(a.amount)) : null;
      const amountText = amountNum !== null && Number.isFinite(amountNum) 
        ? (amountNum > 1000 ? `${(amountNum / 1000).toFixed(1)}K` : amountNum.toFixed(4)) 
        : '—';
      const txnFeeNum = a.txnFee !== null && a.txnFee !== undefined ? parseFloat(String(a.txnFee)) : null;
      const txnFeeText = txnFeeNum !== null && Number.isFinite(txnFeeNum) ? txnFeeNum.toFixed(4) : '—';
      const statusText = (a.status || '—').toString();

      const dateSource = a.date || a.TIMESTAMP || '—';
      let dateText = '—';
      let timeText = '—';
      try {
        const d =
          typeof dateSource === 'number'
            ? new Date(dateSource * 1000)
            : new Date(String(dateSource));
        if (!isNaN(d.getTime())) {
          dateText = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          timeText = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
      } catch {
        dateText = '—';
        timeText = '—';
      }

      return {
        ...(chain !== 'Solana' && { type: typeText }),
        tx_hash: hash,
        block: blockText,
        from: fromText,
        to: toText,
        amount: amountText,
        txnFee: txnFeeText,
        status: statusText,
        date: dateText,
        time: timeText,
        rawData: a
      };
    });
  }, [raw, chain]);

  const visibleData = data.slice(0, visibleCount);

  const openExplorer = (hash, chain) => {
    if (!hash || hash === '—') return;
    let url = '';
    if (chain === 'BSC') url = `https://bscscan.com/tx/${hash}`;
    else if (chain === 'Ethereum') url = `https://etherscan.io/tx/${hash}`;
    else url = `https://solscan.io/tx/${hash}`;
    window.open(url, '_blank');
  };

  const hasData = data.length > 0;

  // Compact Mobile Card View
  const MobileCard = ({ item, index }) => {
    const isSuccess = item.status === 'Success' || item.status === 'SUCCESS';
    const isIncoming = item.type === 'IN';
    const showType = chain !== 'Solana';
    
    return (
      <div className="bg-[#1A1A1E] rounded-lg p-3 mb-2 border border-[#2A2A2E]">
        {/* Header with type, status, date and time */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {showType && (
              <>
                <div className={`p-1 rounded mr-2 ${isIncoming ? 'bg-green-900/20' : 'bg-blue-900/20'}`}>
                  {isIncoming ? (
                    <FiArrowDownLeft size={12} className="text-green-400" />
                  ) : (
                    <FiArrowUpRight size={12} className="text-blue-400" />
                  )}
                </div>
                <span className={`text-xs font-medium ${isIncoming ? 'text-green-400' : 'text-blue-400'}`}>
                  {isIncoming ? 'IN' : 'OUT'}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full mx-2 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </>
            )}
            <span className={`text-xs ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
              {isSuccess ? 'Success' : 'Failed'}
            </span>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-gray-400">{item.date}</div>
            <div className="text-xs text-gray-500">{item.time}</div>
          </div>
        </div>
        
        {/* Amount and transaction row */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-semibold text-white">{item.amount}</div>
          <div 
            className="flex items-center bg-[#25252A] rounded-md px-2 py-1 cursor-pointer"
            onClick={() => openExplorer(item.tx_hash, chain)}
          >
            <span className="text-xs text-blue-400 mr-1">View TX</span>
            <FiExternalLink size={12} className="text-blue-400" />
          </div>
        </div>
        
        {/* Addresses in a compact layout */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <div className="text-gray-400 mb-1">From</div>
            <div className="text-gray-200 truncate" title={item.from}>
              {shorten(item.from, 6, 4)}
            </div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">To</div>
            <div className="text-gray-200 truncate" title={item.to}>
              {shorten(item.to, 6, 4)}
            </div>
          </div>
        </div>
        
        {/* Fee and block in a compact layout */}
        <div className="flex justify-between items-center pt-3 border-t border-[#2A2A2E]">
          <div className="text-xs text-gray-400">
            Fee: <span className="text-gray-300">{item.txnFee}</span>
          </div>
          {item.block && item.block !== '—' && (
            <div className="text-xs text-gray-400">
              Block: <span className="text-gray-300">{item.block}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6">
      <div className="bg-[#141416] rounded-2xl mb-4 overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 bg-[#141416] border-b border-[#2A2A2E]">
          <h2 className="font-bold text-[#CCFF00] text-lg">
            Recent Activity
          </h2>
        </div>

        {/* Content */}
        <div className="p-3">
          {hasData ? (
            <>
              {isMobile ? (
                // Mobile Card View
                <div>
                  {visibleData.map((item, index) => (
                    <MobileCard key={index} item={item} index={index} />
                  ))}
                </div>
              ) : (
                // Desktop Table View (unchanged)
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1f1f23]">
                        {chain !== 'Solana' && (
                          <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">Type</th>
                        )}
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">Date</th>
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">Tx Hash</th>
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">Status</th>
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">From</th>
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">To</th>
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">Amount</th>
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">Txn Fee</th>
                        <th className="py-2.5 text-center text-sm font-bold text-[#a1a1aa]">Block</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleData.map((item, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-[#374151]">
                          {chain !== 'Solana' && (
                            <td className="py-2.5 text-center">
                              <div className={`text-sm font-medium ${
                                item.type === 'IN' ? 'text-[#22c55e]' : 'text-[#ef4444]'
                              }`}>
                                {item.type}
                              </div>
                            </td>
                          )}
                          <td className="py-2.5 text-center text-sm text-[#e4e4e7]">{item.date}</td>
                          <td className="py-2.5 text-center">
                            <div 
                              className="text-[#60a5fa] underline text-sm cursor-pointer"
                              onClick={() => openExplorer(item.tx_hash, chain)}
                            >
                              {shorten(item.tx_hash)}
                            </div>
                          </td>
                          <td className="py-2.5 text-center">
                            <div className={`text-sm font-medium ${
                              item.status === 'Success' ? 'text-[#22c55e]' : 'text-[#ef4444]'
                            }`}>
                              {item.status}
                            </div>
                          </td>
                          <td className="py-2.5 text-center text-sm text-[#e4e4e7]">{shorten(item.from)}</td>
                          <td className="py-2.5 text-center text-sm text-[#e4e4e7]">{shorten(item.to)}</td>
                          <td className="py-2.5 text-center text-sm text-[#e4e4e7]">{item.amount}</td>
                          <td className="py-2.5 text-center text-sm text-[#e4e4e7]">{item.txnFee}</td>
                          <td className="py-2.5 text-center text-sm text-[#e4e4e7]">{item.block}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-14 h-14 bg-[#2A2A2E] rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-gray-400 text-sm text-center">
                No recent activity found in the last {daysToPhrase(days)}
              </div>
            </div>
          )}
        </div>
      </div>

      {hasData && data.length > 10 && (
        <div className="flex justify-center">
          <button 
            className="bg-transparent border border-[#CCFF00] rounded-[25px] py-2.5 px-6 self-center mt-3 mx-auto block"
            onClick={() => {
              if (visibleCount < data.length) {
                setVisibleCount((prev) => prev + 10);
              } else {
                setVisibleCount(10);
              }
            }}
          >
            <div className="text-[#CCFF00] text-[13px] font-semibold uppercase">
              {visibleCount < data.length ? 'Load More' : 'Show Less'}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default WhaleActivity;