import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See ALL <LuArrowRight className="text-base" />
        </button>
      </div>

      <div>
        {
            transactions?.slice(0,5)?.map((item)=>(
                <TransactionInfoCard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    date={moment(item.data).format("D0 MMM YYYY")}
                    amount={item.amount}
                    type="income"
                    hideDeleteBtn
                />
            ))
        }
      </div>
    </div>
  );
};

export default RecentIncome;
