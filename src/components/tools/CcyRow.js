import React from "react";

const CcyRow = ({
    text,
    bold,
    value,
    ccySymbol,
}) => (
    <div className="small row ccyRowContainer">
        <span className="text-left ccyRowElement col-6">{text}</span>
        <span className={"text-right ccyRowElement col-5"}>{isNaN(value)?"n/a":(bold?<b>{value.toFixed(2)}</b>:value.toFixed(2))}</span>
        <span className={"text-right ccyRowElement col-1"}>{bold?<b>{ccySymbol}</b>:ccySymbol}</span>
    </div>
);

export default CcyRow;

