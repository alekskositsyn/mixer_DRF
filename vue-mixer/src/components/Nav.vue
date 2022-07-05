<template>
  <header class="header ">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" class="logo d-inline-block align-top" alt="logo" loading="lazy"><span
          class="navbar-brand-name mb-0 h2">Mixer</span></a>
      <a class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </a>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <!-- {# {% for item in main_header_menu %}#}
          {# <li class="{% if request.resolver_match.url_name == item.href %} active {% endif %} nav-item">#}
            {# <a class=" nav-link " #} {# href="{% url 'mainapp:'|add:item.href %}">{{ item.name }}<span применение
                шаблонного фильтра add#} {# class="sr-only">(current)</span></a>#}
            {# </li>#}
          {# {% endfor %}#} -->


          <li class="nav-item active">
            <a class=" nav-link " href="#">Продукты<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Доставка <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Контакты</a>
          </li>
        </ul>
        <div class="user-icon">
          <div class="user-entrance">
            <div class="user-btn dropdown">
              <a class=" btn btn-outline-dark dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                пользователь
                <span class="caret"></span>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">
                  профиль
                </a>
                <a class="dropdown-item" href="#">
                  заказы
                </a>
              </div>
            </div>
            <a class="admin btn btn-outline-secondary" href="#">
              админка
            </a>
            <!-- <a class="login_status btn btn-outline-secondary" href="#">
              выход
            </a> 
            <a class="login_status btn btn-outline-secondary" href="#">
              вход
            </a> -->
          </div>
          <!-- <i class="fa fa-user-o fa-2x" aria-hidden="true"></i>    -->
        </div>
        <div class="heart">
          <span class="badge badge-pill badge-danger">
          </span>
          <a class="btn" href="#"><i class="fa fa-heart-o fa-2x" aria-hidden="true"></i></a>
        </div>
        <div class="basket">
          <span class="badge badge-pill badge-danger">
          </span>
          <a class="btn" href="#"><i class="fad fa-shopping-basket " aria-hidden="true"></i></a>
        </div>

      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style>
/* .logo {
  image: url(../assets/logo.png);
} */
</style>