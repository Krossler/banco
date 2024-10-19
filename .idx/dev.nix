# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20                # Node.js version 20
    pkgs.nodePackages.nodemon      # Nodemon para recargar el backend automáticamente
  ];

  # Sets environment variables in the workspace
  env = {
    # Puedes definir variables de entorno aquí si es necesario
  };

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # Puedes agregar extensiones de Visual Studio Code que prefieras
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
    enable = true;  # Enable application previews
    previews = [
      {
        command = [
          "npm"
          "run"
          "start"  # Command to start your application
          "--"
          "--port"
          "$PORT"  # Use the environment variable for the port
          "--host"
          "0.0.0.0"  # Bind to all interfaces
          "--disable-host-check"  # Disable host check for local development
        ];
        manager = "web";  # Specify the manager for web applications
        id = "web";  # Unique identifier for the web preview
      }
    ];
  };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Instala las dependencias del proyecto en su primera ejecución
        npm-install = "npm install";
        default.openFiles = [ ".idx/dev.nix" "README.md" ];
      };

      # Runs when the workspace is (re)started
      onStart = {
        # Puedes agregar otros scripts para el reinicio del workspace si es necesario
      };
    };
  };
}