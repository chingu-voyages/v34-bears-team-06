const userDB = {
  id: "1234",
  first_name: "Johnny",
  last_name: "Boy",
  date_of_birth: "2014-01-01T23:28:56.782+00:00",
  weight: 150,
  height: 178,
};

export default function Dashboard() {
  function returnAge(dob) {
    const timeDiff = (Date.now() - new Date(dob)) / 1000 / 365 / 24 / 60 / 60;
    return Math.floor(timeDiff);
  }

  function returnBMI(height, weight) {
    const kilograms = weight / 2.2;
    const metersHeight = height / 100;
    return (kilograms / metersHeight / metersHeight).toFixed(2);
  }

  return (
    <>
      <div id={userDB.id}>
        Name: {userDB.first_name} {userDB.last_name}
        <br />
        Date of Birth (YYYY/MM/DD): {userDB.date_of_birth.split("T")[0]} <br />
        Age: {returnAge(userDB.date_of_birth)} <br />
        Height: {userDB.height} cm; <br />
        Weight: {userDB.weight} lbs ({(userDB.weight / 2.2).toFixed(1)} kgs){" "}
        <br />
        BMI: {returnBMI(userDB.height, userDB.weight)}
      </div>
    </>
  );
}
