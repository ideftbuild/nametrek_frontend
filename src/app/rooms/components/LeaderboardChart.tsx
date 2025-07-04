import React, { useRef, useEffect } from 'react'; // Removed unused useEffect
import useGameStore from '@/store/gameStore';
import {ChartData, ChartOptions, ScriptableContext} from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Trophy, Crown, Medal } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const LeaderboardChart = React.memo(function LeaderboardChart() {
  // const leaderboardRef = useGameStore((state) => state.leaderboardRef);
  const setLeaderboardRef = useGameStore((state) => state.setLeaderboardRef);
  const hasScores = useGameStore((state) => state.hasScores);
  const allPlayers = useGameStore((state) => state.allPlayers);
  const leaderboardRef = useRef(null);

  useEffect(() => {
    // Store the ref in Zustand when the component mounts
    if (leaderboardRef != null) {
      setLeaderboardRef(leaderboardRef);
    }
  }, [setLeaderboardRef, leaderboardRef]);

  const getGradient = (context: ScriptableContext<'bar'>, isLost: boolean | null): CanvasGradient | string => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) {
      return 'rgba(0, 0, 0, 0.1)';
    }

    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    if (isLost) {
      gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 99, 132, 0.8)');
    } else {
      gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
      gradient.addColorStop(1, 'rgba(75, 192, 192, 0.9)');
    }
    return gradient;
  };

  const data: ChartData<'bar', number[], string> = {
    labels: allPlayers.map(player => player.name),
    datasets: [{
      label: "Score",
      data: allPlayers.map(player => player.score),
      backgroundColor: function(context: ScriptableContext<'bar'>): CanvasGradient | string {
        const index = context.dataIndex;
        return getGradient(context, allPlayers[index]?.lost);
      },
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  // Rest of the options remain the same
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            weight: 500
          },
          color: '#666'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            weight: 500
          },
          color: '#666'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 600
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-4 rounded-xl shadow-xl">
      {/* Title Section */}
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h1 ref={leaderboardRef} className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Leaderboard
        </h1>
      </div>

      {/* Top Players Podium - Only shown when there are scores */}
      {hasScores && (
        <div className="flex justify-center gap-4 mb-6 w-full">
          {allPlayers.slice(0, 3).map((player, index) => (
            <div
              key={player.name}
              className={`flex flex-col items-center p-3 rounded-lg ${
                index === 0
                  ? 'bg-yellow-500/10'
                  : index === 1
                  ? 'bg-slate-300/10'
                  : 'bg-orange-700/10'
              } transition-all duration-300 hover:scale-105`}
            >
              {index === 0 ? (
                <Crown className="w-6 h-6 text-yellow-400 mb-1" />
              ) : (
                <Medal className={`w-5 h-5 ${
                  index === 1 ? 'text-slate-300' : 'text-orange-700'
                } mb-1`} />
              )}
              <span className="text-sm font-medium text-white/90">
                {player.name}
              </span>
              <span className={`text-xs font-semibold ${
                index === 0
                  ? 'text-yellow-400'
                  : index === 1
                  ? 'text-slate-300'
                  : 'text-orange-700'
              }`}>
                {player.score}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Section */}
      <div
        className="w-full h-[400px] transition-all duration-300"
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
});

export default LeaderboardChart;
