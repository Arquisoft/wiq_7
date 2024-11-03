const artworksQuery = `SELECT ?work ?workLabel ?creatorLabel ?image ?sitelinks WHERE {
  # Filtra solo obras de pintura
  ?work wdt:P31 wd:Q3305213.  # Pintura
  
  # La obra debe tener un creador
  ?work wdt:P170 ?creator.
  
  # La obra debe tener una imagen
  ?work wdt:P18 ?image.
  
  # Contar el número de enlaces en Wikipedia
  ?work wikibase:sitelinks ?sitelinks.
  
  # Excluir obras que tengan más de un creador
  MINUS {
    ?work wdt:P170 ?otherCreator.
    FILTER(?otherCreator != ?creator)
  }
  
  # Filtro para incluir solo obras con un número mínimo de sitelinks (popularidad)
  FILTER(?sitelinks >= 20)  # Cambia el número según el umbral que desees

  # Etiquetas para mostrar los nombres de la obra y el autor
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
# Limitar el número de resultados para acelerar la consulta
LIMIT 100
`;

export default artworksQuery;
