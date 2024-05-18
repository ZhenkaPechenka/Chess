package main

import (
  "log"
  "net/http"
  "time"

  "github.com/gin-gonic/gin"
  "github.com/jmoiron/sqlx"
)

type User struct {
  ID    int    `db:"id"`
  Name  string `db:"name"`
}

type GameResult struct {
  UserID  int
  Result  string
  Duration time.Duration 
}

func main() {

  // Подключение к БД
  db, err := sqlx.Connect("postgres", "...")

  // Роутер
  r := gin.Default()

  // POST /play - начать игру
  r.POST("/play", func(c *gin.Context) {
    // Запись игры в БД
  })

  // GET /result - завершить игру  
  r.GET("/result", func(c *gin.Context) {

   // Записать результат игры

   result := GameResult{
	UserID: currentUser.ID, 
	Result: "win", // или "lose", "draw"
	Duration: gameDuration, 
  }

   _, err := db.Exec("INSERT INTO results VALUES ($1,$2,$3)", 
     result.UserID, result.Result, result.Duration)

  })

  // GET /stats - получить статистику
  r.GET("/stats", func(c *gin.Context) {
   // Вытащить данные из БД  
   c.JSON(http.StatusOK, stats)
  })

  log.Fatal(r.Run(":8080"))

}