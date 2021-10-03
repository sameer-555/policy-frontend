import "./styles.css";
import { Link } from "react-router-dom";
const Policy = ({ props }) => {
  const link = `/${props._id.$oid}`;
  return (
    <tr>
      <td>
        <Link to={link}>{props.policy_id}</Link>
      </td>
      <td>{props.customer_id}</td>
      <td>{props.premium}</td>
      <td>{props.customer_region}</td>
      <td>{props.date_of_purchase}</td>
      <td>{props.customer_income_group}</td>
      <td>{props.fuel}</td>
    </tr>
  );
};

export default Policy;
