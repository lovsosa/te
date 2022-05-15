import React from "react";
import { getCookie } from "../../helpers/cookie";

export default function aboutUs({ userData }) {
  console.log(userData);
  return (
    <div
      style={{
        fontSize: "24px",
        minHeight: "100vh",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      © ИА «24.kg» - Новости Кыргызстана. Все права защищены. Вся информация,
      размещенная на данном веб-сайте, предназначена только для персонального
      использования и не подлежит распространению без письменного разрешения ИА
      «24.kg». Редакция не несет ответственности за содержимое перепечатанных
      материалов и высказывания отдельных лиц. Кыргызстан, 720001, г. Бишкек,
      ул.Шопокова, 121/1 +996 312 660188{" "}
    </div>
  );
}

aboutUs.getInitialProps = ({ req, res }) => getCookie(req, res);
