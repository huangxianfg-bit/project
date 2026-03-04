package org.example.dao;

import java.util.List;
import java.util.Map;

/**
 * @author deLinDe
 * @TimeData 2023/6/30
 * @Description: org.example.dao
 */

public interface IFilmsAnalysisDao
{
    public List<Map<String,Object>> findComments();

    //每年(按年升序排序)对应的每个国家的电影
    public List<Map<String,Object>> everyYear_country_films();

    //不同风格的电影总数
    public List<Map<String,Object>> genre_total_films();

    //不同演员参与的总电影数
    public List<Map<String,Object>> actor_total_films();

    //不同演员演的电影数2020-2022
    public List<Map<String,Object>> actor_year2020();
    public List<Map<String,Object>> actor_year2021();
    public List<Map<String,Object>> actor_year2022();
    //不同演员演的电影数2020-2022

    // 每年的电影数量
    public List<Map<String,Object>> everyYear_total_films();

    //电影时长与平均评分的关系
    public List<Map<String,Object>> duration_avg_vote();

//   每年不同风格的电影数量10-22年
    public List<Map<String,Object>> everyYear_genre_total_films();

//    不同国家的电影平均分
    public List<Map<String,Object>> country_avg_vote();

    //top10导演的平均分
    public List<Map<String,Object>> top_director_avg_vote();
    //bottom10导演的平均分
    public List<Map<String,Object>> bottom_director_avg_vote();

    //每年电影平均分趋势
    public List<Map<String,Object>> everyYear_avg();

    //不同导演拍的总电影数量以及他们的平均分top20
    public List<Map<String,Object>> every_director_total_films();

}
