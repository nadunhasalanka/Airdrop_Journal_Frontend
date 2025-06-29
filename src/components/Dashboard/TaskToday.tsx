import React from "react";
import { Link } from "react-router-dom";
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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-100">Today's Tasks</h2>
                    <Link to="/tasks" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                        View All
                    </Link>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                            <input 
                                type="checkbox" 
                                defaultChecked={task.completed} 
                                className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-600 cursor-pointer"
                            />
                            <div className="ml-3 flex-1">
                                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                    {task.description}
                                </p>
                                <p className="text-xs text-gray-400">{task.project}</p>
                            </div>
                            <Link to="/tasks" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                                Go →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default TasksToday;