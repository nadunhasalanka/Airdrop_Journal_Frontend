import React from 'react';
import Card from './Card';


const AirdropNews = () => {
    const newsItems = [
        { title: 'LayerZero Snapshot Rumored for End of June', source: 'CoinDesk', time: '2h ago' },
        { title: 'ZkSync Announces New Governance Model', source: 'The Defiant', time: '8h ago' },
        { title: 'Top 5 Airdrops to Farm in Q3 2024', source: 'Bankless', time: '1d ago' },
        { title: 'EigenLayer opens second phase of claims', source: 'The Block', time: '2d ago' },
    ];

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-lg font-bold text-slate-100 mb-4">Airdrop News</h2>
                <ul className="space-y-4">
                    {newsItems.map((item, index) => (
                         <li key={index} className="border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
                            <a href="#" className="group">
                                <h3 className="font-semibold text-slate-200 group-hover:text-indigo-400 transition">{item.title}</h3>
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>{item.source}</span>
                                    <span>{item.time}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default AirdropNews;
