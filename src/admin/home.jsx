import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Home(){
    const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/home')
        setStats(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques :', error);
      }
    };

    fetchStats();
  }, []);

 if (!stats) return <p>Chargement...</p>;

  return <div>
            <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4"><p class="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Dashboard</p></div>
            <div class="flex flex-wrap gap-4 p-4">
              <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#223549]">
                <p class="text-white text-base font-medium leading-normal">Cars</p>
                <p class="text-white tracking-light text-2xl font-bold leading-tight">{stats.cars.count}</p>
                <p class="text-[#0bda5b] text-base font-medium leading-normal">{stats.cars.growth}%</p>
              </div>
              <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#223549]">
                <p class="text-white text-base font-medium leading-normal">Reservations</p>
                <p class="text-white tracking-light text-2xl font-bold leading-tight">{stats.reservations.count}</p>
                <p class="text-[#0bda5b] text-base font-medium leading-normal">{stats.reservations.growth}%</p>
              </div>
              <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#223549]">
                <p class="text-white text-base font-medium leading-normal">Revenue</p>
                <p class="text-white tracking-light text-2xl font-bold leading-tight">{stats.revenue.count}Dhs</p>
                <p class="text-[#0bda5b] text-base font-medium leading-normal">{stats.revenue.growth}%</p>
              </div>
              <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#223549]">
                <p class="text-white text-base font-medium leading-normal">Clients</p>
                <p class="text-white tracking-light text-2xl font-bold leading-tight">{stats.clients.count}</p>
                <p class="text-[#0bda5b] text-base font-medium leading-normal">{stats.clients.growth}%</p>
              </div>
            </div>
          </div>
        </div>
  </div>
}