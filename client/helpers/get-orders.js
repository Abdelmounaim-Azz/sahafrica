import Image from "next/image";
import { FormattedDate } from "./use-date-format";

export function Orders({ orders }) {
  let i = 0;
  let totalOrders = [];
  while (orders.orders[i]) {
    totalOrders.push(
      <div key={orders.orders[i].id} id="orders">
        <div className="container mt-5 mb-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10">
              <div className="row p-2 bg-card border rounded mb-3">
                <div className="col-lg-4 mt-1 text-center">
                  <div className="img-fluid img-responsive rounded product-image ">
                    <Image
                      height={100}
                      width={150}
                      quality={100}
                      src={orders.orders[i].product.image}
                    />
                  </div>
                </div>
                <div className="col-lg-8 mt-1">
                  <h5>You ordered product {orders.orders[i].product.name} </h5>
                  <div className="d-flex flex-column align-items-center">
                    <h6 className="text-success ml-1">
                      Status:{" "}
                      <span className="text-home ml-1">
                        {orders.orders[i].status}
                      </span>
                    </h6>
                    <h6 className="text-success ml-1">
                      IsDelivered:{" "}
                      <span className="text-home ml-1">
                        {orders.orders[i].isDelivered ? "Yes" : "No"}
                      </span>
                    </h6>
                    <h6 className="text-success ml-1">
                      orderedAt
                      <span className="text-home ml-1">
                        <FormattedDate date={orders.orders[i].paidAt} msg="" />
                      </span>
                    </h6>
                    <h6 className="text-success ml-1">
                      amount:{" "}
                      <span className="text-home ml-1">
                        ${orders.orders[i].product.price}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    i++;
  }
  return <div className="p-2">{totalOrders} </div>;
}
