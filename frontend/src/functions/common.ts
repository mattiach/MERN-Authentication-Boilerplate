/* eslint-disable @typescript-eslint/no-explicit-any */

// Generic form input handler: updates the state dynamically
export const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
  const { name, value } = e.target;
  setState((prevState: any) => ({
    ...prevState,
    [name]: value,
  }));
};
