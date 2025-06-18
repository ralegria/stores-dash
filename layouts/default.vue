<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/logo.svg" alt="eddy logo" class="logo" />
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Mi tienda</a></li>
          <li class="active"><a href="#">Contenido</a></li>
          <li><a href="#">Configuración</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Ordenes</a></li>
          <li><a href="#">Clientes</a></li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <a href="#">Settings</a>
      </div>
    </aside>
    <div class="main-content">
      <header class="topbar">
        <button class="sidebar-toggle" aria-label="Open menu">
          <span>&#9776;</span>
        </button>
        <input type="text" class="search-bar" placeholder="Search" />
        <div class="user-info">
          <span class="user-name">Robbi Darwis</span>
          <span class="user-role">Admin</span>
          <img src="/avatar.png" alt="User avatar" class="avatar" />
        </div>
      </header>
      <main class="page-content">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #181a1b;

  font-family: 'Inter', sans-serif;

  .sidebar {
    width: 220px;
    background: #111312;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;

    &-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;

      .logo {
        width: 80px;
      }
    }

    &-nav {
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      li {
        margin: 8px 0;
      }
      a {
        color: #fff;
        text-decoration: none;
        padding: 12px 24px;
        display: block;
        border-radius: 6px;
        transition: background 0.2s;
      }
      .active a,
      a:hover {
        background: #5c6142;
        color: #fff;
      }
    }

    &-footer {
      margin-top: auto;
      padding: 0 24px;
      a {
        color: #bdbdbd;
        text-decoration: none;
        font-size: 14px;
      }
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;

    .topbar {
      display: flex;
      justify-content: space-between;
      background: #181a1b;
      padding: 16px 32px;
      border-bottom: 1px solid #232323;

      .sidebar-toggle {
        display: none;
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        margin-right: 16px;
      }
      .search-bar {
        flex: 1;
        max-width: 400px;
        padding: 8px 16px;
        border-radius: 6px;
        border: none;
        background: #232323;
        color: #fff;
        margin-right: 24px;
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        .user-name {
          font-weight: 500;
        }
        .user-role {
          font-size: 12px;
          color: #bdbdbd;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
    .page-content {
      flex: 1;
      padding: 32px;
      background: #181a1b;
    }
  }

  @media (max-width: 900px) {
    .sidebar {
      width: 60px;
      padding: 12px 0;
      &-header, &-footer, &-nav a {
        text-align: center;
        padding-left: 0;
        padding-right: 0;
      }
      &-nav {
        a {
          font-size: 0;
          position: relative;
          &:before {
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;
            background: #5c6142;
            border-radius: 4px;
            margin-right: 0;
          }
        }
        .active a:before {
          background: #8fa16a;
        }
        .active a,
        a:hover {
          background: #5c6142;
        }
        a {
          background: none;
        }
      }
      &-footer a {
        font-size: 0;
      }
      .logo {
        width: 32px;
      }
    }
    .main-content {
      padding-left: 0;
      .topbar {
        padding: 12px 8px;
        .search-bar {
          max-width: 120px;
          margin-right: 8px;
        }
        .user-info {
          gap: 4px;
          .user-name, .user-role {
            display: none;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .sidebar {
      display: none;
    }
    .main-content {
      padding-left: 0;
      .topbar {
        .sidebar-toggle {
          display: block;
        }
      }
      .page-content {
        padding: 12px;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
