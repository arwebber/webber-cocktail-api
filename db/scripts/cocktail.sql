CREATE TABLE `s4ofvm3lvcnodbsy`.`COCKTAIL` (
  `idDrink` VARCHAR(255) NOT NULL,
  `strDrink` VARCHAR(255) NOT NULL,
  `strDrinkAlternate` VARCHAR(255),
  `strTags` VARCHAR(255),
  `strVideo` VARCHAR(255),
  `strCategory` VARCHAR(255),
  `strIBA` VARCHAR(255),
  `strAlcoholic` VARCHAR(255),
  `strGlass` VARCHAR(255),
  `strInstructions` VARCHAR(255),
  `strInstructionsES` VARCHAR(255),
  `strInstructionsDE` VARCHAR(255),
  `strInstructionsFR` VARCHAR(255),
  `strInstructionsIT` VARCHAR(255),
  `strInstructionsZH-HANS` VARCHAR(255),
  `strInstructionsZH-HANT` VARCHAR(255),
  `strDrinkThumb` VARCHAR(255),
  `strIngredient1` VARCHAR(255),
  `strIngredient2` VARCHAR(255),
  `strIngredient3` VARCHAR(255),
  `strIngredient4` VARCHAR(255),
  `strIngredient5` VARCHAR(255),
  `strIngredient6` VARCHAR(255),
  `strIngredient7` VARCHAR(255),
  `strIngredient8` VARCHAR(255),
  `strIngredient9` VARCHAR(255),
  `strIngredient10` VARCHAR(255),
  `strIngredient11` VARCHAR(255),
  `strIngredient12` VARCHAR(255),
  `strIngredient13` VARCHAR(255),
  `strIngredient14` VARCHAR(255),
  `strIngredient15` VARCHAR(255),
  `strMeasure1` VARCHAR(255),
  `strMeasure2` VARCHAR(255),
  `strMeasure3` VARCHAR(255),
  `strMeasure4` VARCHAR(255),
  `strMeasure5` VARCHAR(255),
  `strMeasure6` VARCHAR(255),
  `strMeasure7` VARCHAR(255),
  `strMeasure8` VARCHAR(255),
  `strMeasure9` VARCHAR(255),
  `strMeasure10` VARCHAR(255),
  `strMeasure11` VARCHAR(255),
  `strMeasure12` VARCHAR(255),
  `strMeasure13` VARCHAR(255),
  `strMeasure14` VARCHAR(255),
  `strMeasure15` VARCHAR(255),
  `strImageSource` VARCHAR(255),
  `strImageAttribution` VARCHAR(255),
  `strCreativeCommonsConfirmed` VARCHAR(255),
  `dateModified` DATETIME DEFAULT(NOW()),
  PRIMARY KEY (`idDrink`));
