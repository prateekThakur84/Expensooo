import React from "react";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useStae({
    source: "",
    amount: "",
    date: "",

    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });
  return <div>AddIncomeForm</div>;
};

export default AddIncomeForm;
