import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../pageStyles.css";

const personajes = [
    {
        id: 1,
        nombre: "Rick Sanchez",
        especie: "Human",
        estado: "Alive",
        imagen: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        descripcion: "Genio científico, inventor del portal gun. Abuelo de Morty y Summer.",
    },
    {
        id: 2,
        nombre: "Morty Smith",
        especie: "Human",
        estado: "Alive",
        imagen: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        descripcion: "Nieto ansioso de Rick. Compañero involuntario de aventuras interdimensionales.",
    },
    {
        id: 5,
        nombre: "Jerry Smith",
        especie: "Human",
        estado: "Alive",
        imagen: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
        descripcion: "Padre de Morty y Summer. Conocido por su falta de autoestima y ambición.",
    },
    {
        id: 3,
        nombre: "Summer Smith",
        especie: "Human",
        estado: "Alive",
        imagen: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        descripcion: "Hermana mayor de Morty. Adolescente que busca ser popular.",
    },
    {
        id: 4,
        nombre: "Beth Smith",
        especie: "Human",
        estado: "Alive",
        imagen: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
        descripcion: "Hija de Rick y madre de Morty. Cirujana de caballos con conflictos internos.",
    },
    {
        id: 6,
        nombre: "Abadango Cluster Princess",
        especie: "Alien",
        estado: "Alive",
        imagen: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
        descripcion: "Princesa alienígena del Abadango Cluster. Aparece en aventuras intergalácticas.",
    },
];

const cardSx = {
    backgroundColor: "rgba(16, 42, 50, 0.95)",
    border: "1px solid #2fb344",
    borderRadius: "12px",
    color: "#edf7f6",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 32px rgba(114, 245, 66, 0.15)",
    },
};

const ExpandMore = ({ expand, ...other }) => {
    return (
        <IconButton
            {...other}
            sx={{
                color: "#72f542",
                transform: expand ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
            }}
        />
    );
};

export const MuiCardPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [favorites, setFavorites] = useState({});

    const toggleFavorite = (id) => {
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="page_shell">
            {/* Título de la página */}
            <div>
                <span className="eyebrow">Componentes MUI</span>
                <h1 className="page_title">Material UI — React Cards</h1>
                <p className="page_text">
                    Implementación de los componentes Card de Material UI siguiendo la
                    documentación oficial, adaptados a la temática interdimensional.
                </p>
            </div>

            {/* === Basic Card === */}
            <Typography
                variant="h5"
                sx={{ color: "#8be9fd", fontWeight: 700, mt: 2 }}
            >
                Basic Card
            </Typography>
            <Card sx={{ ...cardSx, maxWidth: 360 }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ color: "#8be9fd", fontSize: 14, fontWeight: 600 }}
                    >
                        Dimensión C-137
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "#d4f75f", fontWeight: 700 }}
                    >
                        Portal Gun
                    </Typography>
                    <Typography sx={{ color: "#b9d6d0", mb: 1.5 }}>
                        Invento principal
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#b9d6d0" }}>
                        Dispositivo capaz de abrir portales a cualquier dimensión del
                        multiverso. Creado por Rick Sanchez en la dimensión C-137.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" sx={{ color: "#72f542", fontWeight: 600 }}>
                        Aprender Más
                    </Button>
                </CardActions>
            </Card>

            {/* === Outlined Card === */}
            <Typography
                variant="h5"
                sx={{ color: "#8be9fd", fontWeight: 700, mt: 3 }}
            >
                Outlined Card
            </Typography>
            <Card variant="outlined" sx={{ ...cardSx, maxWidth: 360 }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ color: "#8be9fd", fontSize: 14, fontWeight: 600 }}
                    >
                        Ciudadela de Ricks
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "#d4f75f", fontWeight: 700 }}
                    >
                        Consejo de Ricks
                    </Typography>
                    <Typography sx={{ color: "#b9d6d0", mb: 1.5 }}>
                        Gobierno interdimensional
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#b9d6d0" }}>
                        Organización compuesta por múltiples versiones de Rick de
                        diferentes dimensiones. Gobiernan la Ciudadela de Ricks.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" sx={{ color: "#72f542", fontWeight: 600 }}>
                        Explorar
                    </Button>
                </CardActions>
            </Card>

            {/* === Media Card === */}
            <Typography
                variant="h5"
                sx={{ color: "#8be9fd", fontWeight: 700, mt: 3 }}
            >
                Media Card
            </Typography>
            <Card sx={{ ...cardSx, maxWidth: 400 }}>
                <CardMedia
                    sx={{ height: 220, borderBottom: "2px solid #2fb344" }}
                    image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                    title="Rick Sanchez"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#d4f75f", fontWeight: 700 }}
                    >
                        Rick Sanchez
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#b9d6d0" }}>
                        El científico más inteligente del multiverso. Inventor del portal
                        gun y protagonista de innumerables aventuras interdimensionales
                        junto a su nieto Morty.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" sx={{ color: "#72f542", fontWeight: 600 }}>
                        Compartir
                    </Button>
                    <Button size="small" sx={{ color: "#72f542", fontWeight: 600 }}>
                        Aprender Más
                    </Button>
                </CardActions>
            </Card>

            {/* === Complex Interaction Card === */}
            <Typography
                variant="h5"
                sx={{ color: "#8be9fd", fontWeight: 700, mt: 3 }}
            >
                Card con interacción compleja
            </Typography>
            <Card sx={{ ...cardSx, maxWidth: 400 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{
                                bgcolor: "#72f542",
                                color: "#071821",
                                fontWeight: 700,
                            }}
                        >
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton sx={{ color: "#b9d6d0" }}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <Typography sx={{ color: "#d4f75f", fontWeight: 600 }}>
                            Aventura Interdimensional
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" sx={{ color: "#b9d6d0" }}>
                            Dimensión C-137 — Julio 2026
                        </Typography>
                    }
                />
                <CardMedia
                    component="img"
                    height="220"
                    image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
                    alt="Morty Smith"
                    sx={{ borderTop: "1px solid #2fb344", borderBottom: "1px solid #2fb344" }}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: "#b9d6d0" }}>
                        Morty acompaña a Rick en una misión peligrosa a través de múltiples
                        dimensiones. Lo que comienza como una simple recolección de
                        cristales se convierte en una épica batalla interdimensional.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton sx={{ color: "#b9d6d0" }}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#b9d6d0" }}>
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-label="mostrar más"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#d4f75f", fontWeight: 600, mb: 1 }}
                        >
                            Detalles de la Aventura
                        </Typography>
                        <Typography paragraph sx={{ color: "#b9d6d0" }}>
                            La misión requiere atravesar 5 dimensiones diferentes, cada una
                            con sus propios peligros y reglas físicas únicas.
                        </Typography>
                        <Typography paragraph sx={{ color: "#b9d6d0" }}>
                            Rick utiliza el portal gun para saltar entre realidades mientras
                            Morty intenta mantener la cordura ante las situaciones cada vez
                            más absurdas.
                        </Typography>
                        <Typography paragraph sx={{ color: "#b9d6d0" }}>
                            El desenlace involucra una paradoja temporal que solo Rick puede
                            resolver, demostrando una vez más su genialidad científica.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>

            {/* === Grid de Personajes === */}
            <Typography
                variant="h5"
                sx={{ color: "#8be9fd", fontWeight: 700, mt: 3 }}
            >
                Grid de Personajes — Media Cards
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 3,
                }}
            >
                {personajes.map((p) => (
                    <Card key={p.id} sx={cardSx}>
                        <CardMedia
                            sx={{
                                height: 200,
                                borderBottom: "2px solid #2fb344",
                                filter: favorites[p.id]
                                    ? "none"
                                    : "saturate(0.8)",
                                transition: "filter 0.3s ease",
                            }}
                            image={p.imagen}
                            title={p.nombre}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{ color: "#d4f75f", fontWeight: 700 }}
                            >
                                {p.nombre}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        backgroundColor:
                                            p.estado === "Alive"
                                                ? "rgba(114, 245, 66, 0.15)"
                                                : "rgba(244, 67, 54, 0.15)",
                                        color:
                                            p.estado === "Alive"
                                                ? "#72f542"
                                                : "#f44336",
                                        px: 1.5,
                                        py: 0.3,
                                        borderRadius: "20px",
                                        border: `1px solid ${p.estado === "Alive" ? "#2fb344" : "#f44336"}`,
                                        fontWeight: 600,
                                    }}
                                >
                                    {p.estado}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        backgroundColor: "rgba(139, 233, 253, 0.1)",
                                        color: "#8be9fd",
                                        px: 1.5,
                                        py: 0.3,
                                        borderRadius: "20px",
                                        border: "1px solid rgba(139, 233, 253, 0.3)",
                                        fontWeight: 600,
                                    }}
                                >
                                    {p.especie}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: "#b9d6d0" }}>
                                {p.descripcion}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                        >
                            <Button
                                size="small"
                                sx={{ color: "#72f542", fontWeight: 600 }}
                            >
                                Ver Perfil
                            </Button>
                            <Box>
                                <IconButton
                                    onClick={() => toggleFavorite(p.id)}
                                    sx={{
                                        color: favorites[p.id]
                                            ? "#f44336"
                                            : "#b9d6d0",
                                        transition: "color 0.3s ease, transform 0.2s ease",
                                        "&:hover": { transform: "scale(1.2)" },
                                    }}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton sx={{ color: "#b9d6d0" }}>
                                    <ShareIcon />
                                </IconButton>
                            </Box>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </section>
    );
};
