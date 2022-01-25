import styles from './Utils.module.scss'

interface CheckboxProps {
  state: boolean
  onChange: (state: boolean) => void
  text: string
  disabled: boolean
}

export const Checkbox = ({
  state,
  text,
  onChange,
  disabled,
}: CheckboxProps) => {
  return (
    <label className={styles.toggle}>
      <input
        disabled
        type='checkbox'
        className={styles.toggle_input}
        defaultChecked={state}
        onClick={(e) => onChange((e.target as HTMLInputElement).checked)}
      />
      <span className={styles.toggle_track}>
        <span className={styles.toggle_indicator}>
          <span className={styles.checkMark}>
            <svg
              viewBox='0 0 24 24'
              id='ghq-svg-check'
              role='presentation'
              aria-hidden='true'
              fill='black'
            >
              <path d='M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z'></path>
            </svg>
          </span>
        </span>
      </span>
      <h3 className='font-light select-none'>{text}</h3>
    </label>
  )
}
