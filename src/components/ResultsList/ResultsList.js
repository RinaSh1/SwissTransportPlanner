import React from "react";
import ConnectionDetails from "../ConnectionDetails/ConnectionDetails";

function ResultsList({ connections, selected, onSelect }) {
  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const day = date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return { time, day };
  }

  return (
    <div>
      <ul className="results-list compact">
        {connections.map((c, index) => {
          const from = c.from.station.name;
          const to = c.to.station.name;

          const dep = formatDateTime(c.from.departure);
          const arr = formatDateTime(c.to.arrival);

          const isSelected = selected === c;
          const transfers = c.transfers ?? 0;

          return (
            <li
              key={index}
              className={`connRow ${isSelected ? "connRow--selected" : ""}`}
              onClick={() => onSelect(c)}
              role="button"
              tabIndex={0}
            >
              <div className="connRow__times">
                <span className="connRow__time">{dep.time}</span>
                <span className="connRow__dash">—</span>
                <span className="connRow__time">{arr.time}</span>
              </div>

              <div className="connRow__route">
                <span className="connRow__station">{from}</span>
                <span className="connRow__arrow">→</span>
                <span className="connRow__station">{to}</span>
              </div>

              <div className="connRow__meta">
                <span className="pill">
                  {transfers === 0
                    ? "Direct"
                    : `${transfers} change${transfers > 1 ? "s" : ""}`}
                </span>
              </div>

              <div className="connRow__chev">›</div>
            </li>
          );
        })}
      </ul>

      {/* Details appear below the list */}
      {selected && <ConnectionDetails connection={selected} />}
    </div>
  );
}

export default ResultsList;
