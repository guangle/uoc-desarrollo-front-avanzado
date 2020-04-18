import { InMemoryDbService } from "angular-in-memory-web-api";
import { User } from "../models/user.model";

export class FakeBackendService implements InMemoryDbService {
  //Datos mock: usuarios, ofertas y empresas
  createDb() {
    const users: User[] = [
      {
        id: 1,
        username: "carloscg",
        name: "Carlos",
        surname: "Caballero",
        birthdate: "19/11/1984",
        phone: "644039911",
        phone2: "690940321",
        email: "carlos.caballero@gmail.com",
        password: "1234",
        roles: ["student"],
        documentType: { uid: 1, name: "NIF" },
        documentNumber: "26808956H",
        license: "B1",
        aboutMe: "LOREM IPSUM LOREM IPSUMLOREM IPSUM",
        otherCompetences: "LOREM IPSUM LOREM IPSUMLOREM IPSUM",
        recover_request_pending: false,
        address: {
          street: "Urbanización las Areanas - 45",
          province: { uid: 4, name: "Cádiz" },
          municipe: { uid: 6, name: "Chiclana de la Frontera" },
        },
        avatar_hash: "assets/img/perfil.png",
        studies: [
          {
            uid: 1,
            level: { uid: 1, name: "Ciclo Formativo" },
            category: { uid: 2, name: "Informática y comunicaciones" },
            institution: {
              uid: 2,
              name: "IES Politécnico Jesús Marin",
            },
            title: {
              uid: 2,
              name: "Administracion de sistemas informaticos y redes",
            },
            grade: {
              uid: 3,
              name: "Ciclo Formativo de Grado Superior",
            },
            date: "30/06/2005",
            dual: false,
            bilingue: true,
            certificate: true,
          },
          {
            uid: 2,
            institution: {
              uid: 2,
              name: "IES Politécnico Jesús Marin",
            },
            category: { uid: 2, name: "Informática y comunicaciones" },
            level: { uid: 1, name: "Ciclo Formativo" },
            title: {
              uid: 1,
              name: "Técnico Superior en Desarrollo de Aplicaciones Web",
            },
            grade: { uid: 3, name: "Ciclo Formativo de Grado Superior" },
            date: "30/06/2007",
            dual: true,
            bilingue: false,
            certificate: false,
          },
        ],
        experiencies: [],
        languages: [
          {
            uid: 1,
            level: { uid: 5, name: "C1" },
            name: { uid: 1, name: "Inglés" },
            date: "30/06/2005",
          },
          {
            uid: 2,
            level: { uid: 4, name: "B2" },
            name: { uid: 2, name: "Francés" },
            date: "30/06/1998",
          },
        ],
        offers: [],
      },
      {
        id: 2,
        username: "guangle",
        name: "Juan Jesús",
        surname: "Gutiérrez",
        birthdate: "31/08/1984",
        phone: "616538590",
        phone2: "956496271",
        email: "guangle@gmail.com",
        password: "1234",
        roles: ["student"],
        documentType: { uid: 1, name: "NIF" },
        documentNumber: "75762695M",
        license: "B1",
        aboutMe:
          "licenciado en ing informática, me apasiona todo lo relacionado con el software en general y la IA en particular",
        otherCompetences: "baloncesto, billar y sobre todo javascript :P",
        recover_request_pending: false,
        address: {
          street: "Gerión - 45",
          province: { uid: 4, name: "Cádiz" },
          municipe: { uid: 6, name: "Chiclana de la Frontera" },
        },
        avatar_hash: "assets/img/perfil.png",
        studies: [
          {
            uid: 1,
            level: { uid: 1, name: "Ciclo Formativo" },
            category: { uid: 2, name: "Informática y comunicaciones" },
            institution: {
              uid: 2,
              name: "IES Politécnico Jesús Marin",
            },
            title: {
              uid: 2,
              name: "Administracion de sistemas informaticos y redes",
            },
            grade: {
              uid: 3,
              name: "Ciclo Formativo de Grado Superior",
            },
            date: "30/06/2005",
            dual: false,
            bilingue: true,
            certificate: true,
          },
          {
            uid: 2,
            institution: {
              uid: 2,
              name: "IES Politécnico Jesús Marin",
            },
            category: { uid: 2, name: "Informática y comunicaciones" },
            level: { uid: 1, name: "Ciclo Formativo" },
            title: {
              uid: 1,
              name: "Técnico Superior en Desarrollo de Aplicaciones Web",
            },
            grade: { uid: 3, name: "Ciclo Formativo de Grado Superior" },
            date: "30/06/2007",
            dual: true,
            bilingue: false,
            certificate: false,
          },
        ],
        experiencies: [],
        languages: [
          {
            uid: 1,
            level: { uid: 5, name: "C1" },
            name: { uid: 1, name: "Inglés" },
            date: "30/06/2005",
          },
          {
            uid: 2,
            level: { uid: 4, name: "B2" },
            name: { uid: 2, name: "Francés" },
            date: "30/06/1998",
          },
        ],
        offers: [],
      },
    ];

    const offers: any[] = [
      {
        id: 1,
        company: {
          uid: 33,
          name: "Coritel",
        },
        job: {
          name: "Programador Jr Java",
          description: "Programación y prueba unitaria en Java",
        },
        province: { uid: 1, name: "Málaga" },
        municipe: { uid: 7, name: "Estepona" },
        date: "21/09/2006",
        category: { uid: 2, name: "Informática y Comunicaciones" },
        title: [
          { uid: 1, name: "Desarrollo Aplicaciones Web" },
          { uid: 4, name: "Desarrollo Aplicaciones Multiplataforma" },
          //metemos alguno de los titulos de los usuarios de prueba para que puedan apuntarse
          { uid: 2, name: "Administracion de sistemas informaticos y redes" },
        ],
      },
      {
        id: 2,
        company: {
          uid: 33,
          name: "Coritel",
        },
        job: {
          name: "Comercial",
          description:
            "Relaciones con los clientes y atención a las redes sociales.",
        },
        province: { uid: 1, name: "Málaga" },
        municipe: { uid: 8, name: "Campanillas (PTA)" },
        date: "21/09/2016",
        category: { uid: 4, name: "Comercio y Marketing" },
        title: [{ uid: 5, name: "Gestión Comercial y Empresarial" }],
      },
      {
        id: 3,
        company: {
          uid: 33,
          name: "Coritel",
        },
        job: {
          name: "Analista Programador Java",
          description:
            "Análisis funcional y diseño técnico/detallado de componentes",
        },
        province: { uid: 5, name: "Granada" },
        municipe: { uid: 9, name: "Motril" },
        date: "11/07/2016",
        category: { uid: 2, name: "Informática y Comunicaciones" },
        title: [
          { uid: 4, name: "Desarrollo Aplicaciones Multiplataforma" },
          //metemos alguno de los titulos de los usuarios de prueba para que puedan apuntarse
          { uid: 2, name: "Administracion de sistemas informaticos y redes" },
        ],
      },
      {
        id: 4,
        company: {
          uid: 35,
          name: "Indra",
        },
        job: {
          name: "Administrativo",
          description: "Gestión de cartera de clientes.",
        },
        province: { uid: 2, name: "Sevilla" },
        municipe: { uid: 10, name: "Osuna" },
        date: "01/12/2015",
        category: { uid: 5, name: "Administración y Gestión" },
        title: [{ uid: 6, name: "Empresariales" }],
      },
    ];

    const companies: any[] = [
      {
        password: "1234",
        id: 1,
        username: "rrhh@fujitsu.es",
        email: "rrhh@fujitsu.es",

        nombre_comercial: "Fujitsu",
        razon_social: "Fujitsu",
        cif: "G17537499",
        direccion: {
          street: "Isla de la Cartuja",
          province: { uid: 2, name: "Sevilla" },
          municipe: { uid: 2, name: "Sevilla" },
        },
        url: "http://fujitu.es",
        contacto: {
          contacto_nombre: "Eva Gonzalez Alonso",
          contacto_telefono: 658770044,
          contacto_mail: "rrhh@fujitsu.es",
        },

        idioma_app: { uid: 6, name: "Castellano" },
      },
      {
        password: "1234",
        id: 2,
        username: "rrhh@everis.es",
        email: "rrhh@everis.es",

        nombre_comercial: "Everis",
        razon_social: "Everis",
        cif: "C75946657",
        direccion: {
          street: "Isla de la Cartuja",
          province: { uid: 2, name: "Sevilla" },
          municipe: { uid: 2, name: "Sevilla" },
        },
        url: "http://everis.es",
        contacto: {
          contacto_nombre: "Cristina Nuñez Garrido",
          contacto_telefono: 611447702,
          contacto_mail: "rrhh@everis.es",
        },

        idioma_app: { uid: 6, name: "Castellano" },
      },
    ];

    return { users, offers, companies };
  }
}
