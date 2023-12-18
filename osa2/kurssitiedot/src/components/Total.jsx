const Total = ({parts}) => {
    const initialValue = 0;
    const totalValue = parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        initialValue,
    );
    console.log("totalValue ", totalValue)
    return (
      <p>
        <b>
            total of {totalValue} exercises
        </b>
      </p>
    )
  }

  export default Total