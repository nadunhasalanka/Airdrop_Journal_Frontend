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
                <h2 className="text-xl font-semibold text-gray-100 mb-6">Airdrop News</h2>
                <div className="space-y-4">
                    {newsItems.map((item, index) => (
                        <div key={index} className="border-b border-gray-800/30 pb-4 last:border-b-0 last:pb-0">
                            <a href="/news" className="group block">
                                <h3 className="font-medium text-gray-200 group-hover:text-violet-400 transition-colors mb-2">
                                    {item.title}
                                </h3>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{item.source}</span>
                                    <span>{item.time}</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default AirdropNews;