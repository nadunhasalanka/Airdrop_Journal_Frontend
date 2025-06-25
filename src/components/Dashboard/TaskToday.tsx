// === NEW: TODAY'S TASKS COMPONENT ===
import React from "react";
import Card from "./Card";

const TasksToday = () => {
    const tasks = [
        { project: 'ZkSync', description: 'Bridge ETH to ZkSync Era', completed: false },
        { project: 'LayerZero', description: 'Swap on Stargate Finance', completed: true },
        { project: 'Scroll', description: 'Deploy a smart contract on testnet', completed: false },
        { project: 'Starknet', description: 'Claim your STRK airdrop', completed: false },
        { project: 'EigenLayer', description: 'Restake ETH', completed: false },
        { project: 'Blast', description: 'Interact with a dApp on Blast Mainnet', completed: true },
    ];

    return (
        <Card>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-slate-100">Today's Tasks</h2>
                    <a href="#" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">View All</a>
                </div>
                {/* Scrollable container with fixed height */}
                <div className="max-h-80 overflow-y-auto pr-2">
                    <ul className="space-y-3">
                        {tasks.map((task, index) => (
                            <li key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                <div className="flex items-center">
                                    <input type="checkbox" defaultChecked={task.completed} className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600 cursor-pointer"/>
                                    <div className="ml-3">
                                        <p className={`font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{task.description}</p>
                                        <p className="text-xs text-slate-400">{task.project}</p>
                                    </div>
                                </div>
                                <a href="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">Go to task &rarr;</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
};

export default TasksToday;
