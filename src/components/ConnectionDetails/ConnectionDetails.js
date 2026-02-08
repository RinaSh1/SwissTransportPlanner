import React from "react";

function formatTime(iso) {
    return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function formatDay(iso) {
    return new Date(iso).toLocaleDateString("de-CH", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function durationMinutes(depIso, arrIso) {
    const dep = new Date(depIso).getTime();
    const arr = new Date(arrIso).getTime();
    const mins = Math.max(0, Math.round((arr - dep) / 60000));
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

function ConnectionDetails({ connection }) {
    if (!connection) return null;

    const from = connection.from.station.name;
    const to = connection.to.station.name;
    const dep = connection.from.departure;
    const arr = connection.to.arrival;

    const depTime = formatTime(dep);
    const arrTime = formatTime(arr);

    const dayLine = `${formatDay(dep)}, ${durationMinutes(dep, arr)}`;

    // Legs: use sections if available, otherwise show a simple fallback
    const sections = connection.sections || [];
    const legs = sections
        .filter((s) => s.departure && s.arrival) // keep real sections
        .map((s) => ({
            depTime: s.departure?.departure ? formatTime(s.departure.departure) : "",
            arrTime: s.arrival?.arrival ? formatTime(s.arrival.arrival) : "",
            from: s.departure?.station?.name || "",
            to: s.arrival?.station?.name || "",
            platformFrom: s.departure?.platform,
            platformTo: s.arrival?.platform,
            isWalk: !s.journey, // walk/transfer
            line:
                s.journey?.category && s.journey?.number
                    ? `${s.journey.category} ${s.journey.number}`
                    : null,
            direction: s.journey?.to || null,
        }));

    return (
        <div className="sbb-detail">
            {/* top summary card */}
            <div className="sbb-summary">
                <div className="sbb-title">{from} <span className="sbb-arrow">→</span> {to}</div>
                <div className="sbb-sub">{dayLine}</div>

                <div className="sbb-timebar">
                    <div className="sbb-time">{depTime}</div>
                    <div className="sbb-bar">
                        <span className="sbb-dot" />
                        <span className="sbb-line" />
                        <span className="sbb-mid" />
                        <span className="sbb-line" />
                        <span className="sbb-dot" />
                    </div>
                    <div className="sbb-time">{arrTime}</div>
                </div>
            </div>

            {/* legs list */}
            <div className="sbb-legs">
                {legs.length === 0 ? (
                    <div className="sbb-legcard">
                        <div className="sbb-legrow">
                            <div className="sbb-legtime">{depTime}</div>
                            <div className="sbb-legmain">
                                <div className="sbb-legplace">{from}</div>
                                <div className="sbb-legmeta">Platform: {connection.from.platform ?? "—"}</div>
                            </div>
                        </div>

                        <div className="sbb-legrow">
                            <div className="sbb-legtime">{arrTime}</div>
                            <div className="sbb-legmain">
                                <div className="sbb-legplace">{to}</div>
                                <div className="sbb-legmeta">Platform: {connection.to.platform ?? "—"}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    legs.map((leg, idx) => (
                        <div className="sbb-legcard" key={idx}>
                            {/* departure row */}
                            <div className="sbb-legrow">
                                <div className="sbb-legtime">{leg.depTime}</div>

                                <div className="sbb-vline">
                                    <span className="sbb-vdot" />
                                    <span className="sbb-vstroke" />
                                </div>

                                <div className="sbb-legmain">
                                    <div className="sbb-legtop">
                                        <div className="sbb-legplace">{leg.from}</div>
                                        <div className="sbb-platform">
                                            Platform {leg.platformFrom ?? "—"}
                                        </div>
                                    </div>

                                    {leg.isWalk ? (
                                        <div className="sbb-legmeta">Transfer / Walk</div>
                                    ) : (
                                        <div className="sbb-legmeta">
                                            {leg.line ? <strong>{leg.line}</strong> : null}
                                            {leg.direction ? <span> · Direction {leg.direction}</span> : null}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* arrival row */}
                            <div className="sbb-legrow">
                                <div className="sbb-legtime">{leg.arrTime}</div>

                                <div className="sbb-vline">
                                    <span className="sbb-vdot hollow" />
                                    <span className="sbb-vstroke none" />
                                </div>

                                <div className="sbb-legmain">
                                    <div className="sbb-legtop">
                                        <div className="sbb-legplace">{leg.to}</div>
                                        <div className="sbb-platform">
                                            Platform {leg.platformTo ?? "—"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ConnectionDetails;
