

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>,func : () => void) => {
    if (event.key === 'Enter') {
        func()
    }
  };