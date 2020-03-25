import React, { useState, useEffect } from 'react'

type FilterProps = {
    filters: string[]
    onChange: (filters: string[]) => void
}
const filterValues = [
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
]

const Filter: React.FC<FilterProps> = props => {
    const [filters, setFilters] = useState<string[]>(props.filters)

    const handleCheckboxChange = (value: string) => {
        setFilters(
            filters.includes(value)
                ? filters.filter(fil => fil !== value)
                : [...filters, value]
        )
    }

    useEffect(() => props.onChange(filters), [filters])

    return (
        <div className="form">
            <h1 className="filter-header">
                {' '}
                <span role="img" aria-label="movie camera">
                    🎥
                </span>{' '}
                Filtrer på sesong{' '}
                <span role="img" aria-label="clapper board">
                    🎬
                </span>
            </h1>
            <h4 className={filters.length === 0 ? 'help-text' : 'hide'}>
                *Psst* trykk på en sesong{' '}
                <span role="img" aria-label="face with hand over mouth">
                    🤭
                </span>
            </h4>
            <div className="filter-container">
                {filterValues.map(v => (
                    <div className="filter-btn-container">
                        <span
                            className={
                                filters.includes(v)
                                    ? 'label label-active unselectable'
                                    : 'label unselectable'
                            }
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
