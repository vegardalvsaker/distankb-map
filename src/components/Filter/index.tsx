import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { seasons } from '../../constants'
import styles from './styles.module.css'

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
        <div className={styles.form}>
            <div className={styles.filterHeaderContainer}>
                <h2 className={styles.filterHeader}>
                    «Der ingen skulle tru at nokon kunne bu»
                </h2>
            </div>
            <div className={styles.filterHeaderContainer}>
                <h1 className={styles.filterHeader}>Episodekart!</h1>
            </div>
            <span
                onClick={() => setFilters(allSelected ? [] : seasons)}
                className={classnames(
                    'unselectable',
                    styles.pickAll,
                    styles.label,
                    allSelected ? styles.labelActive : ''
                )}
            >
                {allSelected ? 'Velj ingen' : 'Velj alle'}
            </span>
            <h4
                className={filters.length === 0 ? styles.helpText : styles.hide}
            >
                *Psst* velj ein sesong
                <span role="img" aria-label="face with hand over mouth">
                    🤭
                </span>
            </h4>
            <div className={styles.filterContainer}>
                {seasons.map(v => (
                    <div key={v} className={styles.filterBtnContainer}>
                        <span
                            className={classnames(
                                'unselectable',
                                styles.label,
                                filters.includes(v) ? styles.labelActive : ''
                            )}
                            onClick={() => handleCheckboxChange(v)}
                        >
                            {v}
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.emojiGroup}>
                <span className="flipped" role="img" aria-label="cow">
                    🐄
                </span>

                <span role="img" aria-label="sunrise over mountains">
                    🌄
                </span>
                <span role="img" aria-label="sheep">
                    🐏
                </span>
            </div>
            <div className={styles.footer}>
                <span className={styles.footerContent}>
                    Vegard Alvsaker
                    <span style={{ color: 'black' }}> | </span>
                    <a href="https://github.com/vegardalvsaker/distankb-map">
                        Open kjeldekode
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Filter
