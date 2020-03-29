import React, { useState, useEffect } from 'react'
import { seasons } from '../../constants'

type FilterProps = {
    filters: string[]
    onChange: (filters: string[]) => void
}

const Filter: React.FC<FilterProps> = props => {
    const [filters, setFilters] = useState<string[]>(props.filters)

    const handleCheckboxChange = (value: string) => {
        setFilters(
            filters.includes(value)
                ? filters.filter(fil => fil !== value)
                : [...filters, value]
        )
    }
    const allSelected = filters.length === seasons.length
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => props.onChange(filters), [filters])

    return (
        <div className="form">
            <h1 className="filter-header">
                <span role="img" aria-label="movie camera">
                    🎥
                </span>
                Filtrer på sesong
                <span role="img" aria-label="clapper board">
                    🎬
                </span>
            </h1>
            <span
                onClick={() => setFilters(allSelected ? [] : seasons)}
                className={`unselectable pick-all ${
                    allSelected ? 'label label-active' : 'label'
                }`}
            >
                {allSelected ? 'Velg ingen' : 'Velg alle'}
            </span>
            <h4 className={filters.length === 0 ? 'help-text' : 'hide'}>
                *Psst* trykk på en sesong
                <span role="img" aria-label="face with hand over mouth">
                    🤭
                </span>
            </h4>
            <div className="filter-container">
                {seasons.map(v => (
                    <div key={v} className="filter-btn-container">
                        <span
                            className={`unselectable ${
                                filters.includes(v)
                                    ? 'label label-active'
                                    : 'label'
                            }`}
                            onClick={() => handleCheckboxChange(v)}
                        >
                            {v}
                        </span>
                    </div>
                ))}
            </div>
            <h1>
                <span className="flipped" role="img" aria-label="cow">
                    🐄
                </span>

                <span role="img" aria-label="sunrise over mountains">
                    🌄
                </span>
                <span role="img" aria-label="sheep">
                    🐏
                </span>
            </h1>
        </div>
    )
}

export default Filter
