import React, { useEffect, useState } from "react";
import Product from "./product";
import Customer from "./customer";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router";
import Sales from "./sales";
import { backEndUrl } from "../env.constant";

interface Admin {
  name: string;
  phone: string;
  gender: string;
  email: string;
  role: string;
}

const Dashboard = ({ children }: any) => {
  const [userDetails, setUserDetails] = useState<Admin | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId: any = decodedToken?.sub;
      fetchUserDetails(userId);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${backEndUrl}/admin/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-0">
        <div className="col-span-1">
          <div className=" bg-clip-border rounded-xl bg-white text-gray-700 w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
              <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
                Admin Dashboard
              </h5>
            </div>
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
              <div
                role="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-red-100 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                Add Sale
              </div>
              <div
                role="button"
                onClick={() => navigate("/products")}
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-red-100 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                Products
              </div>
              <div
                role="button"
                onClick={() => navigate("/sales")}
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-red-100 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                Sales
              </div>
              <div
                role="button"
                onClick={() => navigate("/customers")}
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-red-100 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                Customers
              </div>
            </nav>
            <br /> <br />
            <div className="max-w-xs">
              <div className="bg-white rounded-lg py-2">
                <div className="photo-wrapper p-2">
                  <img
                    className="w-32 h-32 rounded-full mx-auto"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlQMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcBAgj/xABMEAABAwMABQgECwQFDQAAAAABAAIDBAURBhIhMVEHEzJBYXGBoSKRsdEUFSMzQlJicqKywRY1U5IkVILw8SUmJzQ2Q2Nkc6PC0uL/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUBAgMGB//EADURAAIBAwEFBAkEAgMAAAAAAAABAgMEESEFEjFBURMiYZEUMjNxgaHB0fAGI0KxUuEVJGL/2gAMAwEAAhEDEQA/ANxQAgBACA4ThAc1kAi+tpWO1X1ELTwMgCxvI23ZdBRkrJBmNzXDi0gplcjDTXFHsFZMHUAIAQAgBACAEAIAQAgBACAEAZQGfaYcoPwCZ9DZQyWoYcSVDhlkZ4AdZ8lCr3W692Bb2ezO0ip1dF0KBU3WuumX19ZPUEna2R/o/wAu4epVlSpOT7zLunQpU/UikNXyUkA+U5tvgFoot8jdt9RAXW2xP1oyGP8ArsGqfWF17OaNZa6NktbdOrnQSNNFdnyRDYYak843z2+orvCrXgRqllb1PWjr4af6NA0c5SaG4ObBdmiinccCQHWid4/R8dnapdK7jLSWjKq42VUh3qb3l8/9l6a5rmhzXAtIyCDsKmFU9DqAEAIAQAgBACAEAIAQAgKtyiXx1ksEhgfqVNSeajcDgtyPSd4DPio9zU3IacWTtn26rVu9wWrMIElVUZ+BQfJ/xJNx9aq92MfWZ6dt5Gs1TW0kuq6Rmt9jBwt1CEkYbYxe90ji+UlxJ3krqljRGrFo6p8WMRxeLP1WHFMJjuK9St2OhjcOxcnRXU23nzHLbzTO+cpyPula9i+o3iw6PcoM+j7AyndJUUX9WmBwOOq7q8x2KRSqVaenFEO5s6Vx3no+ptuj90ivVlo7lA0tjqYw8NJyW8R4HYrKLUllHm6tN0puD5EgtjmCAEAIAQAgBACAEAIDJuV6fnb3R0snzMVPr44lzv8A5CrL5vfSR6HZEEqUpdWUZ8rpAB0WD6I3BQksFsRj4DPMTqlznuwB7F0UsIzhFusthp4GBzo2vl63OGTns4BRpVZS9xzk90nmWyGQAGMHvCzFM5OqcdovQSnL6OnceJiC7pT5M5u4R4/ZG3t2ihpvGNZxPqPSURGmVnihtkTmMa0RO2YGAAdhA8lqswZ2pVFM0zkzpZaPQe2RTN1XFr5AOAc9zh5EK5oZ7NZPN7Rad1PH5hYLQupCBACAEAIAQAgBACAEBlfLDRubcbfWgehJE6Jx4EHI/MfUq6+jqmX2x5pwlD4meqAXArQsZ8Nhzu1wVib0ZsXGjbuxlcYo4zJ+iYSRrAFSoRIVV9CYhpw4blKjDJBnUwKvpABuW7gaKqRVVbaesqaemrIhJBJK1r2Hc4Z3eS5KC7SOepKVWUacnF64LuxoawNaAABgAbgFalCekAIAQAgBACAEAIAQAgKtyj2wXHRipc0ZlpcVDNn1el+HKj3UN+m/AnbOrdlcLPB6Gb2qmhbQRudG17pG6zi5uc5VG2enY0ultERjqaJpALh6A24PYilyYi+TJ+1iR0bDK0NfjaBxWI8TnULNQtGxS6ZW1WTdKAApsCDUHMjmBm1dG0cUnkiJsfDqUj+OzGO9Rv5x95Mj7OXuZagrIqAQAgBACAEAIAQAgBACA8yMbI1zXgFrhgg9YQJ41RlVytHxJVOoWnWiaMxH7BJx4jd4KhuKfZ1HE9Za3HpFJT58/eMSM4HUOpRGSCQpMDC3icZk5RvAAUuDIVSJKQTYG9SoyIconZ6j0d6zKYjTI2nlMl2pGZyOeafVtXGDzUivEk1IqNGT8C6jcrYoTqAEAIAQAgOZ7EAIDqAEAIAQEVerJT3eNgm1mSM6Ejd47O5R69vGstSTbXdS3eY6roZpUsbFcqukY/WNPK6PJ68dao69Pck0emo1e1pqeMDiE6mqDwXOLD1JGnnwu8ZHCcR9HU4G9d1M4OmJz1WzesOZmNMNHv6RpBT8GBzz6iP1W9t3qyNb17ltLx0L4DsVwefMp0k5RtI6TSu6WSz2yglbQuYOcmeQSHNBBIyOK70aDq+qcataNJZkRb9O+UN49GCxxf2Hn/yKkKwqHH06l4iDtLuUSTfcLZF9yDPtBWy2fPwNHfw5JiEmkGn8vS0ihZ9ynZ/6rZbPl1Rq9oR6MbSXHTeQenpdOM7wyFo9y3/47xXk/ua/8iv8fn/oYV8ukzaaWefSy5v5tjn4ZK+POBnqck7BRg5Z4fnUQv3Kajjj4/6Nh5J6qprNBaCetqJaiZxfmSZ5e4jWOMk7SquejLJcC4LUyCAEAIDy9wa0uccAbSjGMmH1Mj5LjPXMyTNK+Q9us4lUFTEpNnp6Hcil0RJwyCeFr2HbwUVppknxF4p+1ZUjDiOBUbN63UzTdEZqjI3rO8bxiQN4q7vHJH8S3J1BJt5x7W5c5vUPWr7YtjKupVW8Lh9zz237+NBwoYy+L+hZeRa8Xe6/Hkd3uU1aaaSJsZlxs6YOO/VCl1YqL3UV0JOS3is3dv8Apa0pH/DgP/bZ71L2fpJkO/8AVQ9MatMlZgTdGs5MYEzGs5MYPLo1tkxgj72zForj/wAu/wBi51n+1L3HSiv3Y+81DkhGNALbsxnXP4ivOz4noFwLktTIIAQHC4AEkgALDaQKhpPpK0wT0dse2V5jc2STaQ3II9Hid+1U13tSMJKFPXPFlnbWMsKdTToUmljbJTANG4bAuDLSL1ESJKOTnI26zD0mrV4Z2TxoO43x1I14XAO62nYucoHRA/nWDaNnFa4ZnRjaSRxUuzsq13PdprTm+S/OhGvb6jZU9+px5Lm/zrwGr2lxyV9AtqELelGlDgj5vdXE7irKrPiya5Bht0iPGoj2+Mio6777+JdUvUXuRXNLZZIOVnSExu1deKDq3jmo1O2ak5PPQhbQb3VgBW1X8T8I9yt9yJU77PYuUjemYz5LVwj1MqUg+OKZvzro290g/Vc3urmdFvPkOY6qnmALJBt3Z61nDxlGG8PDGmkDR8R1xBHzDto7lxrP9uR1oa1Y+803knGNArZ3P/OVQz4l8i3rUyCAY3G5wULQJMuld0ImdJ3uHaVEur2jax3qj+HM7UbedZ6cFzKvd6+aobmsI1T0KVh9H+0fpexeRu9qV7yW7HuwLi2t4Q9Tj15/DoV0wltUwhoDZGFpAG4jb71wbzB+BYTeY6jZwNHU62PkpD4A8FaWlftIbr4o4MfBjJW5GNqkYNlIYVdvAOvGS13EFbIb2OAjQMkkfOyRxdqAYyO9cq1x6O01FPPVZEk6vd3mvdp9BV1K5xw3JPDrV7YfqeisU68NxdVw8uK+Z52+/T9R5qUqm8//AFx8/vgpgiu1xvd0pY7nLSMpXtw3m85Ds93DzV/SqSuG3Tnp4alLUhG3jHtIajm32O621sraLSKrphMcyCnaWax4n0u0+tbeg54y+Rqr5rhH5iU2i7qiodU1V3r5p3jDpXOGs7vJBW8bKMeEmayvZS4xR4/ZSm3SVdXJ95zfct/Q4c5PzNPTJ8kjn7J236TZT266yrKlzz5mPTqw3uej9vpbdUTRRSa7IyWkyuO31rWraUYU20vmbUrutOok2PrV+7oB9lSLT2KOF57eX5yOXlxbaKsAnBjOQFtc+xka23tomy8lYxoHa/uO/MV5ufE9Ci2LUyQ18u5oyKWkw+skGRndGPrFVe0toxtIYXrMm2tr2vfn6q+ZBDVp2Pmme6WV3Tkd0nn3Lw1arUuam9N5LLWbUYrC6Ec7WlkMj+kfJdliKwiYkorCB8ZIDmY12EObnrI6v0WYywzD10YnU08UrSANaGQAtzw943LaM5U5JrijWLyteJGPhqaIksDpYuotG0d4VvRvKdRYlozGMCUlyY5u3fwUxLPAwObNA4smnkaQZOiCOodaqb+spTUY8jaOg6kiUNSO6Z5q6OOogNcxjRUtAZM4Da8Dd7Va7F2rLZ9xuyeacuK6eK9xUbRsI3UNz+S9X7fnAiizPavqKeVoeGaa0Z4dGs5NcHh0fYtkzGBMxrORgjNIWatmrDj/AHZXKu/2pHWgv3YjS1fu6n+7+q2tPYx/OZree3l+chO+nFoqvuY81tc+xkYtfbRNq5MBjQW1bMfJu/MV5qfE9CiwXGqZRUUtTL0YxnHE9QXGtVVKm5y4I60aTqzUI8ymUxfIX1M5Dp5zrPOPUF88u68q1RzlxL+aikoR4I8Vby+QNHRb7VpTjhZOlKOFk8BuAtzc6hg8saNbmTsa8l0Z4O62+O/vWz1WTWWne8/v8OfgGpg7ty1NslF5SL/8CMNppJDHVSYmmlZsdG36IB4kjPd3q+2NZ9pmtPhwS+pAuqzzuRLDoTehpBZ5J5AG1VN8nUDqccbHN7Dw6ioO07NWtbEeD1R0o15TSTRLPaoCZNiztGcPew9Fw3LWprhmtVaJop14idTXCVrS4NJyNq+sfpy69J2dBy1cdPLh8jwm3KHY3rceEln48/n/AGNW1Ezd0r/WrzdRU7zFWV0w6Wq7vCw4IzvsWZXsPTYR2jatdx8jO/1GOkk0T7DWGN4zqYxuO8KPcpqkyTbNOrErsdzraOGNvxbK+AD0ZdVwDhxzjBUWleunBRxw8SXWslUm5Z4jeu0hgrKOWm5otkePrA4W1W8VSm47ppSsnTqKWT6G5NP9hrR/0SfxFVEuJaI5ppUEspKMbpXl7+5v+PkqHblbdpKn1+hbbLhrKo+WhFtfhuSvHtE9rIgOPWV1Ox6QAgOPaHtLePWieBwF4nRubrzZ5xo3dUnDP6rDOMozWkeD+RknK3Rc1d6WuacvqAWuH9+8r1Gw629TlT6Ee8gkoyXuLFyVRNZo9NJrZmkqXc4Pq4AAHq2+Kg7bk3cJPobWmsH7y5O3KmJiEmHEw7Vl8DMtUV3Spn9Jhk+sCD5L3n6LqZp1qfTD88/Y8p+pYeyn71/TINe4PKggOoCOv/7pnzwHtCjXfsWSbT20Rtbb/f7DqSWu7zsi/qsjteADry07B4YPaqJxTL3e1Nx0SfR6YaLUVxvFkoTJOwh8clO1zHYONZusD6Jxkd64tYehui1QxRwRMihjZHGwBrGMaAGgbgB1LBkpelUutfmtO6OEbO8leU25Juso9EX+zopWzfVjQO9DG/KocEhaPUBsWTbOTqGQQAgBDBmfLA75e1t+8fNei2CvX+BEvPVivf8AQV5La/Vra2hcdkkYlYO1pw7yI9S327SzCFVctPsc7SWG4mjO4DJPALzRPyIOIa4Ekdy3xobLLWhAaUPbzcBLgPTIGdnVuXsv0a0q1VPov7PN/qWP7FPH+X0IIbd23uX0A8cdQHEBHaQn/JM3e0fiCi3nsWSrP2yNL0D5PtH6qxW+63CnkrZ6iISmOofrRNJ6gwYBHflUEpPOC+SRpMcbI2NZG0NY0Ya1owAOC5mx6QGfaSv/AM46r7IYPwheQ2u966kumP6PS2Ef+rH4/wBjdj8jCqGiQ4i4OR71qc3FHdnAjuKGMPqHj5IY7wY7W+fuQd7oHi3zQd7oZjyvf65bdv0Xe1ej2F6s/gRrrWMc+P0IXQqrNJpPQOzhsjzE7ucCB54VjtKCqWs1018iPRWKiNikk6srxqRaxihnLJgroonVI9T6DQaWWtstyrJqKGKTWiewN9LZgk6w3cPFen2JRlTUqrXHQpdq1VJqkuXEyvTqz27RappY7PpDHdTLriVsDm60Grq41tVx35PDcvQqrJcCkdNPiV6O9VbMYqKkdheSusbmov5M5u3pv+KLbarTpfcqKKrtUcdfE9utiKeFzmdjmlwIPYuqvqq5nN2VJ8hK52zS74M6GvsNa1hIy5tI87jneMhZneTqR3XgxTs4U570T6D0JppqPRK0U9TG6KaOlY17HjBacbQVXy4k1E2sGQQFC0wpXwXY1RHyU4GD2gAEeQXltr0JRr9pyl9ND0OzKqlR3Oa+pFRSKlaJ7Q5ZIFo0aYPYkCxg1wetcJgYDXCYGDyZBxTAwZpysnWq7cfsP9oXoth6RmR7ler+dCp2h5bdaFzd4qI8fzBW9ws0ZJ9H/RGiu8jatZ80gjhY6R7ui1oySvHU6cpyxFZZavEFmTwWGz6Kvke2a6ei3eIAck/eP6K+s9kPO9X8vuVdztNJbtHz+xmPLDTaSVWkz6OqEzLKA34E2PPMloaM5A3uznYdvDYvSU4RSwiinJ5yzO5LU+I6rZInY+iDg+o4IXTBpvZEfg/Nuy4ZIKYGSVpY+adSS26SeOtf0DTuIlLuDdXb6lnkYy2z6c0PN2dozbzpBsuRiHP7ADnOzONmcYz25XB4zodUTACwZOoAQCFZSw1cDoaiJskbt7SudWlCrHdmso3p1J05b0HhlWrdD5GlzrfUDV6o5erxCo6+xedKXwf3LeltZPSrH4r7ETNZbtTn0qKRw4xkOHkcqtqbMuo/w8ibG9tpcJ+Y2dFVxnD6WdvfG73KM7WsuMH5HZVKT4SXmeNeX+G/+UrTsJ/4vyNu71PTRUO6EEzu5hKyraq+EX5Mw5U1xkvMWjoblL83QznPFhHtXaNhcS4QZzdxQjxmiA0v5PNI9IJ6R9NTwRtja4OM04G8jhngr3ZdnWoRl2ixkgXN7QbW68jvRbkY+B1kNZfbiJeacHtp6ZpAJG3a47fADxVo6KlFxlzIMrxp5gjVKK30tDHqUsDIx14G095WaVCnRW7COCPUrVKrzN5HWF1OR4lijmjdHNGySNwwWvaCD4ICArdB9Gq4k1Fog279Qln5SFspNGN1EfFyXaGRP1hZWuPCSolePU5xTfkN1FgtVhtNnbq2u20tIN2YYg0nx3rDbZkklgAgBACAEAIDmEAY7SgDCAMIAAQABhAdQAgBACAEAIAQAgBACAEB/9k="
                    alt="name"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {userDetails?.name}
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    {userDetails?.role}
                  </div>
                  <table className="text-xs my-3">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Email
                        </td>{" "}
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          {userDetails?.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Phone
                        </td>
                        <td className="px-2 py-2"> {userDetails?.phone}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Gender
                        </td>
                        <td className="px-2 py-2">{userDetails?.gender}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="p-0 m-0">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
